# Quick Reference Card

## 🚀 What's New in v2.0

### For Users
- **JSON Viewer**: Click tabs to switch between Formatted (tree) and Raw JSON views
- **Validation**: Green badge = valid, Red badge = issues found
- **History**: Click "History" in sidebar to see last 10 payloads
- **Export**: Copy button or Download button next to payload
- **Auto-Retry**: AI automatically retries up to 3 times (no action needed)

### For Developers
- **Retry Logic**: See `src/lib/ai/ai-payload-generator.ts`
- **Validation**: See `src/lib/validators/payload-validator.ts`
- **JSON Viewer**: See `components/ui/json-viewer.tsx`
- **Console Logs**: Check browser console for detailed AI generation logs

## 📋 Common Tasks

### Generate a Payload
1. Enter FF ID (e.g., `FFASK001`)
2. Select Locale (e.g., `en_US`)
3. Select Channel (e.g., `EMAIL`)
4. Click "Generate Payload"
5. Wait 3-5 seconds
6. Review in Formatted or Raw view

### View Validation Status
- **Green badge** at top of payload = All good ✅
- **Red badge** = Issues found, see error list ❌
- **Sidebar** shows quick status

### Use History
1. Click "History" in sidebar
2. Click any entry to reload
3. Click "History" again to hide

### Export Payload
- **Copy**: Click copy icon (shows checkmark when done)
- **Download**: Click download icon (saves as JSON file)

### Switch Views
- **Formatted**: Tree view with expand/collapse
- **Raw JSON**: Plain text JSON

## ⚠️ Important Reminders

### Sample Data Warning
> **All account numbers and personal data are AI-generated samples!**
> 
> Examples: `XXXX1234`, `john.doe@test.com`
> 
> **Replace with real data before production use!**

### When to Retry
- **Don't need to!** AI automatically retries 3 times
- If all 3 attempts fail, you'll see an error dialog
- Check console logs for details

### Validation Errors
- Red badge means payload structure has issues
- Check error list for specific problems
- Usually means AI missed a required field
- System fills with defaults automatically

## 🔧 Troubleshooting

### "Template not found"
- Check FF ID exists in `src/lib/data/ff-metadata/`
- Verify template file in `src/lib/data/templates/`
- Check naming: `{event}_{channel}_{locale}.json`

### "Failed to generate payload"
- Check `.env.local` has valid `GEMINI_API_KEY`
- Check internet connection
- See console for detailed error

### Validation shows errors
- Usually safe to ignore if payload looks correct
- System ensures all required fields present
- Can still copy/download the payload

### History not showing
- History only persists during browser session
- Refresh page to reload from session storage
- Generate a payload to start building history

## 📊 Performance Tips

### Faster Generation
- Use default values when testing
- History feature for quick reload
- Console logs show timing

### Better Results
- Add sample data to ff-metadata files
- Use descriptive field names
- Keep event schemas up to date

## 🎯 Best Practices

### For Testing
1. Use default FF ID (`FFASK001`)
2. Try all channels (EMAIL, SMS, PUSH, LETTER)
3. Check validation status
4. Review in both Formatted and Raw views
5. Test copy and download

### For Production
1. Always review generated payloads
2. Replace sample data with real data
3. Validate against your systems
4. Test with real endpoints
5. Monitor console logs

### For Development
1. Check console for AI generation logs
2. Review validation errors
3. Add sample data to ff-metadata
4. Keep templates updated
5. Monitor success rates

## 📚 Documentation Quick Links

- **Getting Started**: `QUICKSTART.md`
- **Full Documentation**: `README.md`
- **AI Details**: `AI_IMPROVEMENTS.md`
- **All Features**: `ENHANCEMENTS.md`
- **Technical Docs**: `CLAUDE.md`
- **Version History**: `CHANGELOG.md`

## 🆘 Need Help?

### Check These First
1. Console logs (F12 in browser)
2. Error dialog message
3. Validation error list
4. This quick reference

### Still Stuck?
1. Review full documentation
2. Check troubleshooting sections
3. Contact development team

## 💡 Pro Tips

- **Tip 1**: Use Formatted view for debugging, Raw for copying
- **Tip 2**: History persists during session - use it!
- **Tip 3**: Console logs show AI retry attempts
- **Tip 4**: Green validation badge = ready to use
- **Tip 5**: Download payloads to keep records

## 🎨 UI Elements

### Icons Explained
- 🌙/☀️ = Theme toggle (dark/light)
- 📋 = Copy to clipboard
- 💾 = Download as JSON
- 📜 = History panel
- 👁️ = Formatted view
- 💻 = Raw JSON view
- ✅ = Validation passed
- ❌ = Validation failed
- ⚠️ = Important notice

### Color Codes
- **Green** = Success, valid, good
- **Red** = Error, invalid, issue
- **Amber** = Warning, notice
- **Blue** = Information, neutral

## 🔑 Keyboard Shortcuts

- **Ctrl/Cmd + C**: Copy (when payload selected)
- **F12**: Open browser console
- **Ctrl/Cmd + R**: Refresh page

## 📈 Success Indicators

### Good Signs ✅
- Green validation badge
- All required parameters shown
- AI Analysis populated
- Payload displays correctly
- Console shows "✅ Payload Generation Successful"

### Warning Signs ⚠️
- Red validation badge (but payload may still work)
- Missing fields in Required Parameters
- Console shows retry attempts

### Error Signs ❌
- Error dialog appears
- Console shows "❌ AI GENERATION FAILED"
- Empty payload area
- Network errors

---

**Keep this card handy for quick reference!**

**Version**: 2.0.0  
**Last Updated**: May 19, 2026
