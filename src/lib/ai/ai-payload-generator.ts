import { ai } from "./gemini";

/**
 * Validates if the AI response contains all required fields
 */
function validateAIResponse(aiData: any, requiredFields: string[]): { valid: boolean; missing: string[] } {
  if (!aiData || typeof aiData !== "object") {
    return { valid: false, missing: requiredFields };
  }

  if (!aiData.params || typeof aiData.params !== "object") {
    return { valid: false, missing: requiredFields };
  }

  const missing: string[] = [];
  requiredFields.forEach((field) => {
    if (!aiData.params[field] || aiData.params[field] === "sample-value") {
      missing.push(field);
    }
  });

  return { valid: missing.length === 0, missing };
}

/**
 * Builds an enhanced prompt with examples and strict formatting
 */
function buildEnhancedPrompt(
  requiredFields: string[],
  template: any,
  ffMetadata: any,
  retryAttempt: number = 0
): string {
  const channelExamples: Record<string, any> = {
    EMAIL: {
      email: "john.doe@example.com",
      alternateEmail: "j.doe@company.com"
    },
    SMS: {
      mobile: "+1-555-0123",
      alternateMobile: "+1-555-0124"
    },
    PUSH: {
      deviceToken: "FCM-TOKEN-ABC123XYZ789",
      platform: "iOS"
    },
    LETTER: {
      address: "123 Main Street, Suite 100, New York, NY 10001",
      country: "USA"
    }
  };

  const sampleData = ffMetadata?.sampleData || {};
  
  let prompt = `You are a precise enterprise banking data generator. Your task is to generate ONLY valid JSON data.

${retryAttempt > 0 ? `⚠️ RETRY ATTEMPT ${retryAttempt}: Previous response was incomplete or invalid. Please ensure ALL required fields are present with realistic values.\n` : ""}

CRITICAL REQUIREMENTS:
1. Return ONLY valid JSON - no markdown, no explanations, no code blocks
2. Include ALL required fields listed below
3. Use realistic banking data (names, account numbers, products)
4. Follow the exact structure specified

REQUIRED OUTPUT STRUCTURE:
{
  "params": {
    ${requiredFields.map(field => `"${field}": "<realistic_value_here>"`).join(",\n    ")}
  },
  "recipientData": {
    "issuer": "001",
    "customerId": "CUST-123456"
  },
  "addressData": ${JSON.stringify(channelExamples[template.type] || {}, null, 4)}
}

REQUIRED FIELDS (ALL MUST BE PRESENT):
${requiredFields.map((field, idx) => `${idx + 1}. "${field}" - ${getFieldDescription(field, sampleData)}`).join("\n")}

CHANNEL TYPE: ${template.type}
LOCALE: ${template.locale?.[0] || "en_US"}

${Object.keys(sampleData).length > 0 ? `SAMPLE DATA FOR REFERENCE:\n${JSON.stringify(sampleData, null, 2)}` : ""}

VALIDATION RULES:
- accountNumber: Use format "XXXX1234" or "4532-XXXX-XXXX-1234"
- fullName: Use realistic full names like "John Michael Smith"
- productName: Use banking products like "Premium Checking Account", "Business Savings Account"
- email: Use format "firstname.lastname@domain.com"
- mobile: Use format "+1-555-0123" or "+61-412-345-678"
- amounts: Use realistic numbers like "150.00", "2500.50"
- dates: Use ISO format "2024-01-15" or "2024-01-15T10:30:00Z"

IMPORTANT: Return ONLY the JSON object. No additional text, no markdown formatting, no explanations.`;

  return prompt;
}

/**
 * Gets a description for a field based on its name
 */
function getFieldDescription(field: string, sampleData: any): string {
  if (sampleData[field]) {
    return `Example: "${sampleData[field]}"`;
  }

  const descriptions: Record<string, string> = {
    fullName: "Full customer name (e.g., 'John Michael Smith')",
    accountNumber: "Masked account number (e.g., 'XXXX1234')",
    productName: "Banking product name (e.g., 'Premium Checking Account')",
    amount: "Transaction amount (e.g., '150.00')",
    transactionId: "Unique transaction ID (e.g., 'TXN-2024-001234')",
    date: "Date in ISO format (e.g., '2024-01-15')",
    email: "Email address (e.g., 'john.smith@example.com')",
    mobile: "Phone number (e.g., '+1-555-0123')",
    customerId: "Customer ID (e.g., 'CUST-123456')",
    issuer: "Issuer code (e.g., '001')",
  };

  return descriptions[field] || "Realistic banking value";
}

/**
 * Attempts to generate AI payload with retry logic
 */
async function attemptGeneration(
  requiredFields: string[],
  template: any,
  ffMetadata: any,
  maxRetries: number = 3
): Promise<any> {
  let lastError: any = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const prompt = buildEnhancedPrompt(requiredFields, template, ffMetadata, attempt);

      console.log(`\n🤖 AI Generation Attempt ${attempt + 1}/${maxRetries}`);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text || "";
      console.log("📥 Raw AI Response:", text.substring(0, 200) + "...");

      // Clean the response more aggressively
      let cleaned = text.trim();
      
      // Remove markdown code blocks
      cleaned = cleaned.replace(/```json\s*/gi, "");
      cleaned = cleaned.replace(/```\s*/g, "");
      
      // Remove any leading/trailing text that's not JSON
      const jsonStart = cleaned.indexOf("{");
      const jsonEnd = cleaned.lastIndexOf("}");
      
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
      }

      // Parse the JSON
      const aiData = JSON.parse(cleaned);

      // Validate the response
      const validation = validateAIResponse(aiData, requiredFields);

      if (validation.valid) {
        console.log("✅ AI Response Valid - All required fields present");
        return aiData;
      } else {
        console.warn(`⚠️ AI Response Invalid - Missing fields: ${validation.missing.join(", ")}`);
        
        // If this is not the last attempt, continue to retry
        if (attempt < maxRetries - 1) {
          console.log(`🔄 Retrying... (${attempt + 2}/${maxRetries})`);
          // Add a small delay before retry
          await new Promise(resolve => setTimeout(resolve, 500));
          continue;
        }
        
        // On last attempt, fill in missing fields
        console.log("⚠️ Last attempt - filling missing fields with defaults");
        validation.missing.forEach((field) => {
          if (!aiData.params) aiData.params = {};
          aiData.params[field] = generateDefaultValue(field);
        });
        
        return aiData;
      }
    } catch (error) {
      lastError = error;
      console.error(`❌ Attempt ${attempt + 1} failed:`, error instanceof Error ? error.message : error);
      
      if (attempt < maxRetries - 1) {
        console.log(`🔄 Retrying... (${attempt + 2}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  // If all retries failed, throw the last error
  throw new Error(`AI generation failed after ${maxRetries} attempts: ${lastError?.message || "Unknown error"}`);
}

/**
 * Generates a default value based on field name
 */
function generateDefaultValue(field: string): string {
  const defaults: Record<string, string> = {
    fullName: "John Michael Smith",
    accountNumber: "XXXX1234",
    productName: "Premium Checking Account",
    amount: "150.00",
    transactionId: `TXN-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    email: "customer@example.com",
    mobile: "+1-555-0123",
    customerId: "CUST-123456",
    issuer: "001",
  };

  return defaults[field] || `sample-${field}`;
}

export async function generateAIPayload(
  eventSchema: any,
  template: any,
  ffMetadata: any
) {
  const requiredFields =
    eventSchema.properties.params
      .required || [];

  console.log("\n" + "=".repeat(60));
  console.log("🚀 Starting AI Payload Generation");
  console.log("=".repeat(60));
  console.log("📋 Required Fields:", requiredFields);
  console.log("📡 Channel:", template.type);
  console.log("🌍 Locale:", template.locale?.[0]);
  console.log("=".repeat(60) + "\n");

  try {
    // Attempt generation with retry logic
    const aiData = await attemptGeneration(requiredFields, template, ffMetadata, 3);

    /*
     * SAFE PARAMS
     */

    const params = aiData.params || {};

    /*
     * Double-check ALL required params exist (safety net)
     */

    requiredFields.forEach((field: string) => {
      if (!params[field] || params[field] === "sample-value") {
        console.warn(`⚠️ Field "${field}" missing or invalid, using default`);
        params[field] = generateDefaultValue(field);
      }
    });

    /*
     * Add filterFields into params
     */

    Object.entries(
      template.filterFields ||
        {}
    ).forEach(([key, value]) => {
      params[key] = Array.isArray(
        value
      )
        ? value[0]
        : value;
    });

    /*
     * Recipient
     */

    const recipient =
      aiData.recipientData || {};

    /*
     * Address
     */

    const addressData =
      aiData.addressData || {};

    let addressValue =
      "sample@test.com";

    switch (template.type) {
      case "EMAIL":
        addressValue =
          addressData.email ||
          "john.doe@test.com";
        break;

      case "SMS":
        addressValue =
          addressData.mobile ||
          "+61412345678";
        break;

      case "PUSH":
        addressValue =
          addressData.deviceToken ||
          "DEVICE-TOKEN-001";
        break;

      case "LETTER":
        addressValue =
          addressData.address ||
          "21 Wall Street Sydney";
        break;
    }

    /*
     * FINAL SYSTEM-CONTROLLED PAYLOAD
     */

    const finalPayload = {
      event: {
        id: template.event,
        params,
      },

      recipient: {
        schema:
          params.accountNumber
            ? "CREDITACCOUNT"
            : "CUSTOMER",

        id: {
          accountNumber:
            params.accountNumber ||
            "XXXX1234",

          issuer:
            recipient.issuer ||
            "001",
        },
      },

      channel: [
        template.type,
      ],

      template: {
        locale:
          template.locale,
      },

      addresses: [
        {
          type:
            template.type,

          to: [addressValue],
        },
      ],
    };

    console.log("\n✅ Payload Generation Successful");
    console.log("=".repeat(60) + "\n");

    return finalPayload;
  } catch (error) {
    console.error("\n❌ AI GENERATION FAILED AFTER ALL RETRIES");
    console.error("Error:", error);
    console.log("=".repeat(60) + "\n");

    /*
     * FALLBACK PAYLOAD with all required fields
     */

    const fallbackParams: Record<string, string> = {};
    requiredFields.forEach((field: string) => {
      fallbackParams[field] = generateDefaultValue(field);
    });

    // Add filterFields to fallback
    Object.entries(template.filterFields || {}).forEach(([key, value]) => {
      fallbackParams[key] = Array.isArray(value) ? value[0] : value;
    });

    return {
      event: {
        id: template.event,
        params: fallbackParams,
      },

      recipient: {
        schema: "CREDITACCOUNT",

        id: {
          accountNumber: "XXXX1234",
          issuer: "001",
        },
      },

      channel: [
        template.type,
      ],

      template: {
        locale:
          template.locale,
      },

      addresses: [
        {
          type:
            template.type,

          to: [
            template.type === "EMAIL" ? "fallback@example.com" :
            template.type === "SMS" ? "+1-555-0199" :
            template.type === "PUSH" ? "FALLBACK-TOKEN" :
            "123 Fallback Street"
          ],
        },
      ],
    };
  }
}