Thank you.

Let me walk you through the Automated Input Payload Generator.

Problem statement 

After creating a Communication Template, developers require an input payload to trigger the communication and validate the generated preview. To construct this payload, they must navigate through the variables used in the template, multiple configuration files, and event schemas to understand the expected input structure. The complexity arises from the numerous internal business rules and configurations within the Communication Platform, making the process of generating the input payload both time-consuming and challenging.

### Screen 1: Template Selection

Here we start by providing three inputs:

* FF ID
* Locale
* Communication Channel

These are the only inputs required from the developer.

Traditionally, developers would need to navigate through multiple communication configuration files and event schemas to understand what information is required for payload creation.

---

### Template Resolution

Once the inputs are provided, the tool automatically identifies the corresponding communication template.

Behind the scenes, the application:

* Resolves the template mapping.
* Identifies the associated event.
* Retrieves communication configuration details.

The developer does not need to manually search through comm-config files or understand naming conventions.

---

### Generate Payload

Now I'll click on **Generate Payload**.

At this point, the tool performs several automated steps:

* Loads the associated event schema.
* Identifies required event parameters.
* Extracts template variables.
* Applies business rules and filter fields.
* Determines recipient structure based on channel.
* Generates realistic sample values.

All of this happens automatically within a few seconds.

---

### Generated Payload Screen

After generation, the tool displays a complete payload ready for testing.

As you can see, all required attributes are automatically populated.

Without this tool, developers would have to manually inspect:

* Event JSON files
* Template configurations
* Business rules
* Filter fields

and then manually construct the payload.

This automation significantly reduces that effort.

---

### Validation

One important capability is payload validation.

The tool automatically validates:

* Required parameters
* Payload structure
* Data types
* Mandatory fields

This helps reduce payload-related testing failures and improves overall accuracy.

---

### Payload History

The application also maintains payload history.

This allows developers to quickly reload previously generated payloads and avoid repeating the same configuration steps.

---

### Export Options

Once the payload is generated, developers can:

* Copy the payload directly.
* Download it as JSON.
* Reuse it immediately for testing purposes.

This makes the testing process much faster and more efficient.

---

### Closing

To summarize, the workflow is:

FF ID Selection → Template Resolution → Event Schema Analysis → Payload Generation → Validation → Export

The tool eliminates manual payload creation and reduces the effort from several minutes to just a few seconds, while also improving consistency and accuracy.

Thank you.
