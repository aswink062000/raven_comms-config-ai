export function generatePayload(
  eventSchema: any,
  template: any,
  ffMetadata: any
) {
  const params: Record<
    string,
    any
  > = {};

  const requiredFields =
    eventSchema.properties.params
      .required;

  const aiValues: Record<
    string,
    any
  > = {
    fullName: "John Doe",

    productName:
      "Business Platinum Account",

    accountNumber:
      "XXXX1234",

    mobileNumber:
      "+61412345678",

    email:
      "john.doe@test.com",

    amount: "250.00",

    cardNumber:
      "XXXX-XXXX-9012",
  };

  requiredFields.forEach(
    (field: string) => {
      params[field] =
        aiValues[field] ||
        "sample-value";
    }
  );

  Object.entries(
    template.filterFields ||
      {}
  ).forEach(([key, value]) => {
    params[key] = Array.isArray(
      value
    )
      ? value[0]
      : value;
  });

  const addressValue =
    template.type === "EMAIL"
      ? "john.doe@test.com"
      : template.type === "SMS"
      ? "+61412345678"
      : "sample-address";

  return {
    event: {
      id: template.event,

      params,
    },

    recipient: {
      schema:
        "CREDITACCOUNT",

      id: {
        accountNumber:
          params.accountNumber,

        issuer: "001",
      },
    },

    channel: [
      template.type,
    ],

    template: {
      locale:
        template.locale[0],
    },

    addresses: [
      {
        type: template.type,

        to: [addressValue],
      },
    ],
  };
}