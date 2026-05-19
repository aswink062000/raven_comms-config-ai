import { NextResponse } from "next/server";

import { getTemplateByFFId } from "@/src/lib/parsers/template-parser";

import { getEventSchema } from "@/src/lib/parsers/event-parser";

import { getFFMetadata } from "@/src/lib/parsers/ff-parser";


import { generateAIPayload } from "@/src/lib/ai/ai-payload-generator";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const {
      ffId,
      locale,
      channel,
    } = body;

    if (!ffId) {
      return NextResponse.json(
        {
          error:
            "FF ID is required",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * STEP 1
     * Find Template using FF ID
     */

   const templateResult =
  getTemplateByFFId(
    ffId,
    locale,
    channel
  );

    if (!templateResult) {
      return NextResponse.json(
        {
          error:
            "Template not found for FF ID",
        },
        {
          status: 404,
        }
      );
    }

    const template =
      templateResult.template;

    /*
     * STEP 2
     * Find Event Schema
     */

    const eventName =
      template.event;

    const eventSchema =
      getEventSchema(
        eventName
      );

    if (!eventSchema) {
      return NextResponse.json(
        {
          error:
            "Event schema not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * STEP 3
     * Load FF Metadata
     */

    const ffMetadata =
      getFFMetadata(ffId);

    /*
     * STEP 4
     * Generate Payload
     */

    const payload =
  await generateAIPayload(
    eventSchema,
    {
      ...template,
      type:
        channel ||
        template.type,
      locale:
        template.locale,
    },
    ffMetadata
  );

    const requiredParams =
  eventSchema.properties.params.required || [];

return NextResponse.json({
  payload,

  validation: {
    requiredParams,

    generatedParams:
      Object.keys(
        payload.event.params || {}
      ),
  },
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to generate payload",
      },
      {
        status: 500,
      }
    );
  }
}