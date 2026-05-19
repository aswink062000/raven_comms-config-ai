import fs from "fs";

import path from "path";

export function getEventSchema(
  eventName: string
) {
  const eventPath = path.join(
    process.cwd(),
    `src/lib/data/events/${eventName}.json`
  );

  if (!fs.existsSync(eventPath)) {
    return null;
  }

  return JSON.parse(
    fs.readFileSync(
      eventPath,
      "utf-8"
    )
  );
}