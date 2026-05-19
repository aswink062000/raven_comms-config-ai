@AGENTS.md

# Enterprise Communication Platform - Technical Documentation

## Overview

This document provides technical guidance for AI agents and developers working on the Enterprise Communication Platform. The platform uses AI to generate structured communication payloads for banking and financial services.

## System Architecture

### Core Components

1. **Frontend (Next.js App Router)**
   - `app/page.tsx` - Main UI with form inputs and payload display
   - `app/layout.tsx` - Root layout with theme provider
   - `components/ui/*` - Reusable shadcn/ui components

2. **Backend API**
   - `app/api/generate/route.ts` - POST endpoint for payload generation
   - Handles FF ID resolution, template matching, and AI generation

3. **AI Engine**
   - `src/lib/ai/gemini.ts` - Google Gemini client configuration
   - `src/lib/ai/ai-payload-generator.ts` - AI prompt engineering and payload generation
   - Uses Gemini 2.5 Flash model for intelligent data generation

4. **Data Parsers**
   - `src/lib/parsers/template-parser.ts` - Resolves templates by FF ID, locale, and channel
   - `src/lib/parsers/event-parser.ts` - Loads event schemas
   - `src/lib/parsers/ff-parser.ts` - Loads FF metadata

5. **Data Storage**
   - `src/lib/data/events/` - Event schemas (JSON)
   - `src/lib/data/templates/` - Communication templates (JSON)
   - `src/lib/data/ff-metadata/` - FF metadata files (JSON)

## Data Flow

```
User Input (FF ID, Locale, Channel)
    ↓
Template Parser → Find matching template
    ↓
Event Parser → Load event schema
    ↓
FF Parser → Load FF metadata
    ↓
AI Payload Generator → Generate sample data
    ↓
System Assembly → Construct final payload
    ↓
Validation → Check required parameters
    ↓
Response to Frontend
```

## Key Concepts

### FF ID (Form Factor ID)
- Unique identifier for communication templates
- Example: `FFASK001`
- Maps to specific template files via `templateContentId`

### Event Schema
- Defines required parameters for an event
- Located in `src/lib/data/events/{event_name}.json`
- Specifies data types and required fields

### Template
- Defines communication structure for a specific channel and locale
- Naming convention: `{event}_{channel}_{locale}.json`
- Contains metadata, attributes, and filter fields

### Payload Structure
```json
{
  "event": {
    "id": "event_name",
    "params": { /* event-specific parameters */ }
  },
  "recipient": {
    "schema": "CREDITACCOUNT | CUSTOMER",
    "id": { /* recipient identifiers */ }
  },
  "channel": ["EMAIL | SMS | PUSH | LETTER"],
  "template": {
    "locale": ["en_US"]
  },
  "addresses": [
    {
      "type": "EMAIL",
      "to": ["recipient@example.com"]
    }
  ]
}
```

## AI Generation Strategy

### Prompt Engineering
The AI is instructed to generate ONLY:
- `params` - Event-specific parameters
- `recipientData` - Recipient information
- `addressData` - Contact information

The system then assembles these into the final payload structure.

### Safety Measures
1. **Fallback Values**: If AI generation fails, system provides default values
2. **Required Field Validation**: Ensures all required parameters are present
3. **Filter Field Injection**: Automatically adds template filter fields to params
4. **Schema Validation**: Validates against event schema requirements

### Sample Data Generation
- Account numbers are masked (e.g., XXXX1234)
- Email addresses use test domains
- Phone numbers use valid formats
- All data is clearly marked as AI-generated samples

## Enhancement Features

### 1. Payload History
- Stores last 10 generated payloads in session storage
- Allows quick reload of previous configurations
- Persists during browser session only

### 2. Export Functionality
- **Copy to Clipboard**: One-click copy with visual feedback
- **Download as JSON**: Exports with timestamped filename

### 3. Enhanced Error Handling
- Network errors vs validation errors
- Detailed error messages
- User-friendly error dialogs

### 4. Visual Feedback
- Loading skeletons during generation
- Copy confirmation animation
- Validation status badges

### 5. Important Notice
- Prominent warning about AI-generated sample data
- Reminds users to replace with real data before production use

## Development Guidelines

### Adding New Events

1. Create event schema in `src/lib/data/events/{event_name}.json`:
```json
{
  "title": "event_name",
  "properties": {
    "params": {
      "required": ["field1", "field2"],
      "properties": {
        "field1": { "type": "string" },
        "field2": { "type": "string" }
      }
    }
  }
}
```

2. Create template in `src/lib/data/templates/`:
```json
{
  "type": "EMAIL",
  "event": "event_name",
  "locale": ["en_US"],
  "metadata": {
    "default": {
      "templateContentId": "FFXXX001",
      "attributes": {
        "ATTR_1": "$params.field1"
      }
    }
  }
}
```

3. Create FF metadata in `src/lib/data/ff-metadata/{FFID}.json`:
```json
{
  "variables": ["ATTR_1", "ATTR_2"],
  "sampleData": {
    "ATTR_1": "Sample Value"
  }
}
```

### Modifying AI Behavior

Edit `src/lib/ai/ai-payload-generator.ts`:
- Adjust prompt for different generation strategies
- Modify fallback values
- Change validation logic
- Update recipient schema logic

### UI Customization

- Theme colors: Edit Tailwind config
- Component styles: Modify `components/ui/*`
- Layout: Update `app/page.tsx`
- Dark/Light theme: Uses `next-themes`

## Testing Checklist

When making changes, verify:
- [ ] FF ID resolution works correctly
- [ ] Template matching by locale and channel
- [ ] Event schema loading
- [ ] AI generation produces valid JSON
- [ ] All required parameters are generated
- [ ] Payload structure is correct
- [ ] Error handling works for invalid inputs
- [ ] Copy and download functions work
- [ ] History persists during session
- [ ] Theme toggle works
- [ ] Responsive design on mobile

## Common Issues & Solutions

### Issue: Template Not Found
- **Cause**: Incorrect naming convention or missing file
- **Solution**: Verify template filename matches `{event}_{channel}_{locale}.json`

### Issue: AI Generation Fails
- **Cause**: Invalid API key or network issues
- **Solution**: Check `.env.local` for valid `GEMINI_API_KEY`

### Issue: Missing Required Parameters
- **Cause**: Event schema not aligned with template
- **Solution**: Ensure event schema includes all template variables

### Issue: Invalid JSON in AI Response
- **Cause**: AI returned malformed JSON
- **Solution**: System automatically falls back to default values

## Security Considerations

1. **API Key Protection**: Never commit `.env.local`
2. **Sample Data Only**: All generated data is for testing
3. **Input Validation**: Validate all user inputs
4. **Error Messages**: Don't expose internal system details
5. **Session Storage**: History is client-side only

## Performance Optimization

1. **AI Response Caching**: Consider caching common FF IDs
2. **Template Preloading**: Load frequently used templates
3. **Lazy Loading**: Load UI components on demand
4. **Debouncing**: Add debounce to form inputs if needed

## Future Enhancement Ideas

1. **Batch Generation**: Generate multiple payloads at once
2. **Custom Templates**: Allow users to create templates via UI
3. **Payload Validation**: Real-time JSON schema validation
4. **Export Formats**: Support CSV, XML, etc.
5. **Collaboration**: Share payloads between team members
6. **Version Control**: Track template and schema versions
7. **Analytics**: Track generation patterns and success rates
8. **API Documentation**: Auto-generate API docs from schemas

## Maintenance

### Regular Tasks
- Update Gemini AI model version as needed
- Review and update sample data for realism
- Monitor API usage and costs
- Update dependencies regularly
- Review error logs for patterns

### Monitoring
- Track API response times
- Monitor AI generation success rate
- Log validation failures
- Track user error patterns

## Contact & Support

For technical questions or issues:
- Review this documentation first
- Check existing issues in the repository
- Contact the development team

---

**Last Updated**: May 2026
**Version**: 1.0
**Maintained By**: EY Development Team
