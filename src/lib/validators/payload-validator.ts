import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, verbose: true });

// Define the payload schema
const payloadSchema = {
  type: "object",
  required: ["event", "recipient", "channel", "template", "addresses"],
  properties: {
    event: {
      type: "object",
      required: ["id", "params"],
      properties: {
        id: { type: "string" },
        params: { type: "object" },
      },
    },
    recipient: {
      type: "object",
      required: ["schema", "id"],
      properties: {
        schema: { type: "string", enum: ["CREDITACCOUNT", "CUSTOMER"] },
        id: { type: "object" },
      },
    },
    channel: {
      type: "array",
      items: { type: "string", enum: ["EMAIL", "SMS", "PUSH", "LETTER"] },
      minItems: 1,
    },
    template: {
      type: "object",
      required: ["locale"],
      properties: {
        locale: {
          type: "array",
          items: { type: "string" },
          minItems: 1,
        },
      },
    },
    addresses: {
      type: "array",
      items: {
        type: "object",
        required: ["type", "to"],
        properties: {
          type: { type: "string" },
          to: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
          },
        },
      },
      minItems: 1,
    },
  },
};

const validate = ajv.compile(payloadSchema);

export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    field: string;
    message: string;
    path: string;
  }>;
}

export function validatePayload(payload: any): ValidationResult {
  const valid = validate(payload);

  if (valid) {
    return {
      valid: true,
      errors: [],
    };
  }

  const errors = (validate.errors || []).map((error) => ({
    field: error.instancePath || "root",
    message: error.message || "Validation error",
    path: error.instancePath,
  }));

  return {
    valid: false,
    errors,
  };
}

export function validateEventParams(
  params: any,
  requiredFields: string[]
): ValidationResult {
  const errors: Array<{ field: string; message: string; path: string }> = [];

  requiredFields.forEach((field) => {
    if (!params[field]) {
      errors.push({
        field,
        message: `Required field '${field}' is missing`,
        path: `/event/params/${field}`,
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
