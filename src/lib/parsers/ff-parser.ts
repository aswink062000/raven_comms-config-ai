import fs from "fs";

import path from "path";

export function getFFMetadata(
  ffId: string
) {
  const ffPath = path.join(
    process.cwd(),
    `src/lib/data/ff-metadata/${ffId}.json`
  );

  if (!fs.existsSync(ffPath)) {
    return null;
  }

  return JSON.parse(
    fs.readFileSync(
      ffPath,
      "utf-8"
    )
  );
}