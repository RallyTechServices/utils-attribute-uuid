# utils-attribute-uuid

Exports `attributeNameToUUID(attributeNameToUUID(workspaceUUID, typeName, attributeName)` which
returns a Promise that resolves to the UUID of the type attribute in the given workspace.

Useful for custom attributes that are used in multiple workspaces as their name will change but
have a different UUID. The Agile Central webhooks API currently doesn't work when registering a
webhook for a custom field unless the attribute UUID is specified.