# utils-attribute-uuid

Exports `attributeNameToUUID(attributeNameToUUID(workspaceUUID, typeName, attributeName)` which
returns a Promise that resolves to the UUID of the type attribute in the given workspace.

Useful for custom attributes that are used in multiple workspaces as their name will change but
have a different UUID. The Agile Central webhooks API currently doesn't work when registering a
webhook for a custom field unless the attribute UUID is specified.

## Usage
```
var uuidUtils = require('utils-attribute-uuid');
var attributes = ['My First Custom Attribute', 'My Second Custom Attribute'];

attributes.forEach((attribute) => {
  return uuidUtils.attributeNameToUUID(
      process.env.WORKSPACE_UUID,
      'PortfolioItem',
      attribute.name)
    .then((uuid) => {
      console.log(uuid);
    });
});
```

## Developer Notes
To Update
1. `npm version patch` - This will update the package.json to a new version and create a git tag (e.g. `v1.0.1`). It will also run the `postversion` script
to push the changes and tag to GitHub.
2. `npm publish --access public` - This will publish the new version to npmjs.org
3. Create the new release in [`utils-attribute-uuid/releases'](https://github.com/RallyTechServices/utils-attribute-uuid/releases)