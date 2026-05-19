export function buildAIPrompt(
  eventSchema: any,
  template: any,
  ffMetadata: any
) {
  return `
You are an enterprise communication payload generator AI.

Your task is to generate realistic payload values.

EVENT:
${JSON.stringify(eventSchema, null, 2)}

TEMPLATE:
${JSON.stringify(template, null, 2)}

FF METADATA:
${JSON.stringify(ffMetadata, null, 2)}

RULES:
1. All required params must exist
2. Generate realistic banking values
3. Infer recipient schema
4. Generate valid addresses
5. Include filterFields
6. Respect locale and channel
7. Use realistic enterprise data
8. Output valid JSON only
`;
}