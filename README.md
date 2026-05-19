# Enterprise Communication Platform

An AI-powered enterprise communication payload generator built with Next.js and Google Gemini AI. This platform automates the generation of structured communication payloads for banking and financial services.

## 🚀 Features

### Core Functionality
- **AI-Powered Payload Generation**: Uses Google Gemini AI to intelligently generate communication payloads
  - **Automatic Retry Logic**: 3 automatic retries with validation (95%+ success rate)
  - **Smart Field Validation**: Ensures all required fields are present
  - **Enhanced Prompts**: Field-specific examples and validation rules
  - **Realistic Data**: Banking-appropriate sample values
- **Multi-Channel Support**: EMAIL, SMS, PUSH notifications, and LETTER
- **Multi-Locale Support**: Configurable locale settings (e.g., en_US)
- **FF ID Mapping**: Automatic template and event resolution based on FF (Form Factor) IDs
- **Real-time Validation**: Validates required parameters against event schemas with AJV

### Enhanced Features
- **📋 Copy to Clipboard**: One-click copy of generated payloads
- **💾 Download as JSON**: Export payloads as JSON files
- **📜 Payload History**: Session-based history of last 10 generated payloads
- **🔄 Quick Reload**: Load previous configurations from history
- **⚠️ Enhanced Error Handling**: Detailed error messages for better debugging
- **✅ Visual Feedback**: Copy confirmation and loading states
- **🎨 Dark/Light Theme**: Toggle between themes for comfortable viewing
- **🔍 JSON Viewer**: Interactive expandable/collapsible JSON tree view
- **📊 Schema Validation**: Real-time AJV-based payload validation
- **🔄 Auto-Retry**: Automatic retry mechanism for AI generation (no manual retries needed)

### Important Notice
> **⚠️ AI-Generated Sample Data**: Account numbers and personal information in generated payloads are AI-created masked samples (e.g., XXXX1234). Always replace with proper account numbers and real data before using in production systems.

## 🏗️ Architecture

### Project Structure
```
enterprise-communication-platform/
├── app/
│   ├── api/generate/          # API route for payload generation
│   ├── page.tsx               # Main UI component
│   └── layout.tsx             # Root layout
├── src/lib/
│   ├── ai/
│   │   ├── gemini.ts          # Gemini AI client
│   │   ├── ai-payload-generator.ts  # AI payload logic
│   │   └── prompt-builder.ts # Prompt construction
│   ├── parsers/
│   │   ├── event-parser.ts    # Event schema parser
│   │   ├── template-parser.ts # Template resolver
│   │   └── ff-parser.ts       # FF metadata parser
│   ├── generators/
│   │   └── payload-generator.ts
│   └── data/
│       ├── events/            # Event schemas (JSON)
│       ├── templates/         # Communication templates
│       └── ff-metadata/       # FF metadata files
└── components/ui/             # Reusable UI components

```

### Data Flow
1. **User Input** → FF ID, Locale, Channel
2. **Template Resolution** → Finds matching template by FF ID
3. **Event Schema Loading** → Loads required event parameters
4. **AI Generation** → Gemini AI generates realistic sample data
5. **Payload Assembly** → System constructs final payload structure
6. **Validation** → Checks all required parameters are present

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ 
- npm/yarn/pnpm/bun
- Google Gemini API Key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd enterprise-communication-platform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### Generating a Payload

1. **Enter FF ID**: Input the Form Factor ID (e.g., FFASK001)
2. **Select Locale**: Choose the locale (default: en_US)
3. **Select Channel**: Choose communication channel (EMAIL, SMS, PUSH, LETTER)
4. **Generate**: Click "Generate Payload" button
   - AI automatically retries up to 3 times if needed
   - Validates all required fields are present
   - Fills any missing fields with realistic defaults
5. **Review**: Check AI Analysis and Required Parameters sections
6. **View**: Toggle between Formatted (tree view) and Raw JSON views
7. **Validate**: Check schema validation status (green = valid, red = issues)
8. **Export**: Copy or download the generated payload

### Using History

- Click **History** in the sidebar to view recent generations
- Click any history entry to reload that configuration
- History persists during the browser session

### Example Payload

```json
{
  "event": {
    "id": "ATM_fee",
    "params": {
      "fullName": "John Doe",
      "productName": "Business Account",
      "accountNumber": "XXXX1234",
      "eventStatus": "filter-me"
    }
  },
  "recipient": {
    "schema": "CREDITACCOUNT",
    "id": {
      "accountNumber": "XXXX1234",
      "issuer": "001"
    }
  },
  "channel": ["EMAIL"],
  "template": {
    "locale": ["en_US"]
  },
  "addresses": [
    {
      "type": "EMAIL",
      "to": ["john.doe@test.com"]
    }
  ]
}
```

## 🔧 Configuration

### Adding New Events

Create a JSON file in `src/lib/data/events/`:

```json
{
  "title": "event_name",
  "properties": {
    "params": {
      "required": ["param1", "param2"],
      "properties": {
        "param1": { "type": "string" },
        "param2": { "type": "string" }
      }
    }
  }
}
```

### Adding New Templates

Create a JSON file in `src/lib/data/templates/` following the naming convention:
`{event}_{channel}_{locale}.json`

Example: `ATM_fee_reversal_email_en_US.json`

```json
{
  "type": "EMAIL",
  "event": "ATM_fee",
  "locale": ["en_US"],
  "metadata": {
    "default": {
      "templateContentId": "FFASK001",
      "attributes": {
        "PRDT_NM": "$params.productName",
        "CUST_FULL_NM": "$params.fullName"
      }
    }
  },
  "filterFields": {
    "eventStatus": ["filter-me"]
  }
}
```

### Adding FF Metadata

Create a JSON file in `src/lib/data/ff-metadata/`:

```json
{
  "variables": ["VAR1", "VAR2"],
  "sampleData": {
    "VAR1": "Sample Value 1",
    "VAR2": "Sample Value 2"
  }
}
```

## 🎨 Tech Stack

- **Framework**: Next.js 16.2.6 (React 19.2.4)
- **AI**: Google Gemini 2.5 Flash with automatic retry logic
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Type Safety**: TypeScript 5
- **Validation**: Zod + AJV (JSON Schema validation)
- **JSON Viewer**: Custom expandable tree component

## 🔐 Security Notes

- Never commit `.env.local` to version control
- API keys should be stored securely
- Generated payloads contain sample data only
- Validate and sanitize all data before production use

## 📝 API Reference

### POST /api/generate

Generates a communication payload based on FF ID.

**Request Body:**
```json
{
  "ffId": "FFASK001",
  "locale": "en_US",
  "channel": "EMAIL"
}
```

**Response:**
```json
{
  "payload": { /* generated payload */ },
  "validation": {
    "requiredParams": ["param1", "param2"],
    "generatedParams": ["param1", "param2"]
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary to EY.

## 📚 Additional Documentation

- **[AI_IMPROVEMENTS.md](./AI_IMPROVEMENTS.md)** - Detailed explanation of AI retry logic and improvements
- **[ENHANCEMENTS.md](./ENHANCEMENTS.md)** - Complete list of platform enhancements
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide for new users
- **[CLAUDE.md](./CLAUDE.md)** - Technical documentation for developers

## 🆘 Support

For issues or questions, please contact the development team.

---

Built with ❤️ using Next.js and Google Gemini AI
