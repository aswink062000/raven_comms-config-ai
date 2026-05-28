# Enterprise Communication Platform (ECP) - Automated Input Payload Generator

---

## 📌 Problem Statement

The **Enterprise Communication Platform (ECP)** uses communication templates to generate various types of customer communications — **Email, Letter, SMS, and Push Notifications**. These templates are driven by event schemas, business rules, and locale-specific configurations.

### The Challenge

For **testing and development**, developers require valid **input payloads** that conform to the template structure. A significant challenge arises when:

1. **Creating new input payloads** — Developers must manually inspect multiple configuration files (event schemas, template definitions, FF metadata) to understand what fields are required.

2. **Modifying existing template payloads** — When templates are updated with new variables or business rules, developers must trace through configuration files to update test payloads accordingly.

3. **Business rules add complexity** — Each template has its own set of:
   - Required event parameters
   - Filter fields and business logic
   - Locale-specific formatting
   - Channel-specific address structures
   - Recipient schema mappings

### The Manual Process (Current Pain)

```
Developer needs input payload for testing
        │
        ├── Step 1: Identify the FF ID / Template Content ID
        │
        ├── Step 2: Open comm-config and locate the template file
        │           (match by channel + locale naming convention)
        │
        ├── Step 3: Read template to find the event name
        │
        ├── Step 4: Open event schema file to find required parameters
        │
        ├── Step 5: Cross-reference template attributes with event params
        │
        ├── Step 6: Check filterFields and business rules
        │
        ├── Step 7: Determine recipient schema and address format
        │
        ├── Step 8: Manually construct the JSON payload
        │
        └── Step 9: Validate all fields are present and correctly formatted
```

**Result:**
- ⏰ **10–15 minutes** per payload (minimum)
- ❌ Frequent errors due to missing fields or wrong formats
- 🔄 Repeated effort for every template variation
- 📚 Requires deep knowledge of ECP configuration structure
- 🐌 Slows down testing and development cycles

### Root Cause

The complexity arises because **business rules and configuration are distributed across multiple files** — event schemas, template definitions, FF metadata, and filter configurations — making it difficult for developers to quickly assemble a correct input payload without extensive cross-referencing.

---

## ✅ Solution: Automated Input Payload Generator

This tool **eliminates the manual process entirely** by automating input payload generation using AI.

### How It Works

```
Developer provides:              AI automatically:
┌─────────────────┐             ┌─────────────────────────────────┐
│ • FF ID         │             │ ✓ Resolves template             │
│ • Locale        │  ───────►   │ ✓ Loads event schema            │
│ • Channel       │             │ ✓ Identifies required params    │
└─────────────────┘             │ ✓ Applies business rules        │
                                │ ✓ Generates realistic values    │
       Single Click             │ ✓ Validates completeness        │
                                │ ✓ Returns ready-to-use payload  │
                                └─────────────────────────────────┘
```

**Input**: FF ID + Locale + Channel  
**Output**: Complete, validated input payload in **3–5 seconds**

---

## 🎯 Benefits of Using This Automated Tool

### 1. Eliminates Manual Cross-Referencing
| Before | After |
|--------|-------|
| Open 3–4 config files | Enter FF ID only |
| Read event schema manually | AI reads schema automatically |
| Match template variables | AI maps variables instantly |
| Check business rules | AI applies rules automatically |

### 2. Dramatic Time Savings

| Metric | Manual Process | Automated Tool |
|--------|---------------|----------------|
| Time per payload | 10–15 minutes | 3–5 seconds |
| Payloads per hour | 4–6 | 700+ |
| Daily time saved (per developer) | ~2 hours | — |
| Weekly time saved (10-person team) | ~100 hours | — |

### 3. Zero Configuration Knowledge Required
- ❌ No need to understand template file naming conventions
- ❌ No need to manually read event schemas
- ❌ No need to trace filterFields and business rules
- ❌ No need to know recipient schema mappings
- ✅ Just provide FF ID, Locale, and Channel — done

### 4. Error-Free Payload Generation
- ✅ **All required parameters** always included
- ✅ **Correct data types** for each field
- ✅ **Business rules applied** (filterFields, event status)
- ✅ **Channel-appropriate addresses** (email, phone, token, postal)
- ✅ **Locale-specific formatting** (currency, date formats)
- ✅ **Schema validation** confirms payload structure

### 5. Handles Template Changes Effortlessly
When templates are modified:
- **Before**: Developer must re-trace all config files and rebuild payload
- **After**: Just click "Generate" again — AI picks up new requirements automatically

### 6. Supports All Communication Channels

| Channel | Address Format | Use Case |
|---------|---------------|----------|
| EMAIL | john.doe@example.com | Detailed communications |
| SMS | +1-555-0123 | Quick alerts, OTPs |
| PUSH | FCM-TOKEN-ABC123 | Mobile app notifications |
| LETTER | 123 Main Street, City | Formal postal documents |

### 7. Built-in Validation & Quality Assurance
- **Real-time schema validation** (AJV) confirms payload structure
- **Required parameters check** shows generated vs missing fields
- **Visual indicators** (green = valid, red = issues)
- **AI retry logic** ensures 95%+ success rate on first attempt

### 8. Developer Experience Improvements
- 📋 **Templates table** — Browse all available templates in one view
- 📜 **Payload history** — Reload previous configurations instantly
- 🌳 **JSON tree viewer** — Expand/collapse payload sections
- 💾 **Export options** — Copy to clipboard or download as JSON
- 🌓 **Dark/Light theme** — Comfortable for extended use

---

## 📊 Available Templates

| FF ID | Channel | Locale | Event | Description |
|-------|---------|--------|-------|-------------|
| FFASK001 | EMAIL | en_US | ATM_fee | ATM Fee Reversal |
| FFASK002 | EMAIL | en_IN | payment_confirmation | Payment Confirmation |
| FFASK003 | SMS | en_US | card_activation | Card Activation |
| FFASK004 | EMAIL | en_US | account_upgrade | Account Upgrade |
| FFASK005 | EMAIL | en_IN | loan_approval | Loan Approval |
| FFASK006 | PUSH | en_US | statement_ready | Statement Ready |
| FFASK007 | LETTER | en_US | account_closure | Account Closure |
| FFASK008 | LETTER | en_IN | welcome_letter | Welcome Letter |
| FFASK009 | SMS | en_US | balance_alert | Low Balance Alert |
| FFASK010 | SMS | en_IN | balance_alert | Balance Alert |
| FFASK011 | PUSH | en_US | fraud_alert | Fraud Alert |
| FFASK012 | PUSH | en_IN | fraud_alert | Fraud Alert |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Google Gemini API Key ([Get free key](https://ai.google.dev/))

### Installation

```bash
# Install dependencies
npm install

# Set up environment
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# Start development server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Generate Your First Payload

1. Click **"View all available templates"** link
2. Click **"Load"** on any template (e.g., FFASK001)
3. Click **"Generate Payload"**
4. Review the generated payload
5. **Copy** or **Download** for your tests

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                             │
│  FF ID + Locale + Channel → Click Generate                   │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    API LAYER                                  │
│  POST /api/generate                                          │
│  • Validates input                                           │
│  • Orchestrates generation pipeline                          │
└──────────────────────────┬───────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Template    │  │    Event     │  │     FF       │
│  Parser      │  │   Parser     │  │   Parser     │
│              │  │              │  │              │
│ Finds the   │  │ Loads event  │  │ Loads sample │
│ template by │  │ schema and   │  │ data and     │
│ FF ID +     │  │ required     │  │ variable     │
│ channel +   │  │ parameters   │  │ mappings     │
│ locale      │  │              │  │              │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                  │
       └─────────────────┼──────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│              AI PAYLOAD GENERATOR (Gemini 2.5)                │
│                                                              │
│  • Builds context-aware prompt with all requirements         │
│  • Generates realistic parameter values                      │
│  • Validates response completeness                           │
│  • Retries automatically if incomplete (up to 3x)           │
│  • Fills smart defaults as safety net                        │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│              PAYLOAD ASSEMBLY                                 │
│                                                              │
│  • Combines AI-generated params with system structure        │
│  • Applies filterFields and business rules                   │
│  • Sets recipient schema based on account type               │
│  • Formats channel-specific addresses                        │
│  • Validates against AJV schema                              │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│              RESPONSE TO FRONTEND                             │
│                                                              │
│  { payload: {...}, validation: { requiredParams, generated }}│
└──────────────────────────────────────────────────────────────┘
```

---

## ⚠️ Important Note

> **All generated account numbers and personal data are AI-created masked samples.**
>
> Examples: `XXXX1234`, `john.doe@example.com`, `+1-555-0123`
>
> **Replace with proper account numbers and real data before using in production systems.**

---

## 🔧 Adding New Templates

When a new communication template is added to ECP:

1. **Add event schema** → `src/lib/data/events/{event_name}.json`
2. **Add template** → `src/lib/data/templates/{event}_{channel}_{locale}.json`
3. **Add FF metadata** → `src/lib/data/ff-metadata/{FFID}.json`

The tool will automatically pick up new templates — no code changes required.

---

## 📈 Business Impact Summary

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   BEFORE                          AFTER                     │
│   ──────                          ─────                     │
│                                                             │
│   10-15 min/payload      →       3-5 seconds               │
│   Manual cross-reference →       Fully automated            │
│   Error-prone            →       Validated & accurate       │
│   Deep config knowledge  →       Just FF ID needed          │
│   Repeated effort        →       One-click generation       │
│   Slows development      →       Accelerates delivery       │
│                                                             │
│   Result: Faster testing, fewer bugs, quicker releases      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 👨‍💻 Developer

**ASWIN K** | Full Stack Developer | EY

---

## 📄 License

Private and proprietary to EY.
