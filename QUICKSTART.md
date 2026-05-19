# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 20 or higher
- Google Gemini API Key ([Get one here](https://ai.google.dev/))

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Set Up Environment**
Create `.env.local` in the root directory:
```env
GEMINI_API_KEY=your_api_key_here
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Open Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 First Payload Generation

### Step 1: Enter Details
- **FF ID**: `FFASK001` (pre-filled)
- **Locale**: `en_US` (pre-filled)
- **Channel**: Select `EMAIL` (pre-selected)

### Step 2: Generate
Click the **"Generate Payload"** button

### Step 3: Review
Check three sections:
1. **AI Analysis** - Shows detected variables and metadata
2. **Required Parameters** - Validates all parameters are generated
3. **Generated Payload** - Full JSON payload preview

### Step 4: Export
- **Copy**: Click copy icon to copy to clipboard
- **Download**: Click download icon to save as JSON file

## ⚠️ Important Notice

**The generated account numbers and personal data are AI-created samples!**

Example: `XXXX1234`, `john.doe@test.com`

**Always replace with real data before production use.**

## 📜 Using History

1. Generate a few payloads
2. Click **"History"** in the sidebar
3. Click any entry to reload that configuration
4. History persists during your browser session

## 🎨 Theme Toggle

Click the sun/moon icon in the sidebar to switch between light and dark themes.

## 📊 Understanding the Output

### Sample Payload Structure
```json
{
  "event": {
    "id": "ATM_fee",
    "params": {
      "fullName": "John Doe",
      "productName": "Business Account",
      "accountNumber": "XXXX1234"
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

### Key Fields Explained

- **event.id**: The event type (e.g., ATM_fee)
- **event.params**: Event-specific parameters (AI-generated)
- **recipient.schema**: Type of recipient (CREDITACCOUNT or CUSTOMER)
- **channel**: Communication channel (EMAIL, SMS, PUSH, LETTER)
- **template.locale**: Language/region code
- **addresses**: Delivery addresses for the communication

## 🔧 Troubleshooting

### "Template not found for FF ID"
- Check that the FF ID exists in `src/lib/data/ff-metadata/`
- Verify template file exists in `src/lib/data/templates/`
- Ensure naming convention: `{event}_{channel}_{locale}.json`

### "Failed to generate payload"
- Verify `GEMINI_API_KEY` in `.env.local`
- Check internet connection
- Review browser console for detailed errors

### "Event schema not found"
- Ensure event file exists in `src/lib/data/events/`
- Check that event name matches template's event field

## 📚 Next Steps

1. **Read Full Documentation**: See [README.md](./README.md)
2. **Technical Details**: Check [CLAUDE.md](./CLAUDE.md)
3. **Enhancement Details**: Review [ENHANCEMENTS.md](./ENHANCEMENTS.md)

## 🎓 Learning Path

### Beginner
1. Generate payloads with existing FF IDs
2. Try different channels (EMAIL, SMS, PUSH, LETTER)
3. Experiment with history feature
4. Practice copying and downloading

### Intermediate
1. Add new event schemas
2. Create custom templates
3. Modify FF metadata
4. Understand the data flow

### Advanced
1. Customize AI generation logic
2. Add new channels
3. Implement custom validation
4. Extend the UI with new features

## 💡 Tips & Tricks

### Tip 1: Quick Testing
Use the default values (FFASK001, en_US, EMAIL) for quick testing.

### Tip 2: History Navigation
Generate multiple variations and use history to compare results.

### Tip 3: Copy for Integration
Copy the payload and paste directly into your API testing tools.

### Tip 4: Download for Records
Download payloads to keep records of generated configurations.

### Tip 5: Theme Preference
Your theme preference persists across sessions.

## 🔐 Security Reminders

- ✅ Never commit `.env.local` to version control
- ✅ Keep your Gemini API key secure
- ✅ Generated data is for testing only
- ✅ Validate all data before production use
- ✅ Review payloads before sending to real systems

## 📞 Need Help?

1. Check the error message in the dialog
2. Review browser console for details
3. Verify your `.env.local` configuration
4. Check that all required files exist
5. Contact the development team

## 🎉 You're Ready!

You now know how to:
- ✅ Generate AI-powered payloads
- ✅ Use different channels and locales
- ✅ Export payloads (copy/download)
- ✅ Navigate history
- ✅ Understand the output structure

**Happy generating!** 🚀

---

**Need more details?** Check out the full [README.md](./README.md)
