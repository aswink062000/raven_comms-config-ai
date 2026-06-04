import fs from "fs";

import path from "path";

export function getTemplateByFFId(
  ffId: string,
  locale: string,
  channel: string
) {
  const templateDir = path.join(
    process.cwd(),
    "src/lib/data/templates"
  );

  const files =
    fs.readdirSync(templateDir);

  for (const file of files) {
    /*
     * Example:
     * ATM_fee_reversal_email_en_US.json
     */

    const lowerFile =
      file.toLowerCase();

    const lowerChannel =
      channel.toLowerCase();

    const lowerLocale =
      locale.toLowerCase();

    /*
     * Validate naming convention
     */

    const matchesChannel =
      lowerFile.includes(
        `_${lowerChannel}_`
      );

    const matchesLocale =
      lowerFile.includes(
        `_${lowerLocale}.json`
      );

    if (
      !matchesChannel ||
      !matchesLocale
    ) {
      continue;
    }

    const filePath = path.join(
      templateDir,
      file
    );

    const content = JSON.parse(
      fs.readFileSync(
        filePath,
        "utf-8"
      )
    );

    // Support both flat metadata.templateContentId and nested metadata.default.templateContentId
    const templateContentId =
      content?.metadata?.templateContentId ??
      content?.metadata?.default?.templateContentId;

    if (
      templateContentId === ffId
    ) {
      return {
        template: content,
        fileName: file,
      };
    }
  }

  return null;
}