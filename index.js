var request = require("request-promise-native");

function getWorkspaceOidFromUUID(workspaceUUID) {
    var options = {
        "method": "GET",
        "url": 'https://rally1.rallydev.com/slm/webservice/v2.0/workspace',
        "qs": {
            query: `(ObjectUUID = "${workspaceUUID}")`,
            fetch: "ObjectID"
        },
        "headers": {
            "content-type": "application/json",
            "cookie": `ZSESSIONID=${process.env.WEBHOOK_RALLY_API_KEY}`
        },
        "json": true
    };

    return request(options).then(body => {
        return body.QueryResult.Results[0].ObjectID;
    });
}

function getTypeDefinition(workspaceOid, type) {
    var options = {
        "method": "GET",
        "url": 'https://rally1.rallydev.com/slm/webservice/v2.0/typedefinition',
        "qs": {
            query: '(ElementName = "' + type + '")',
            workspace: 'https://rally1.rallydev.com/slm/webservice/v2.0/workspace/' + workspaceOid
        },
        "headers": {
            "content-type": "application/json",
            "cookie": `ZSESSIONID=${process.env.WEBHOOK_RALLY_API_KEY}`
        },
        "json": true
    };

    return request(options).then(body => {
        return body.QueryResult.Results[0]._ref;
    });
}

function getElementNameUUIDFromTypeDef(typeDef, name) {
    var options = {
        "method": "GET",
        "url": typeDef + '/Attributes',
        "qs": {
            query: '(Name = "' + name + '")',
            fetch: "ObjectUUID"
        },
        "headers": {
            "content-type": "application/json",
            "cookie": `ZSESSIONID=${process.env.WEBHOOK_RALLY_API_KEY}`
        },
        "json": true
    };
    return request(options).then(body => {
        return body.QueryResult.Results[0].ObjectUUID;
    });
}

function attributeNameToUUID(workspaceUUID, typeName, attributeName) {
    return getWorkspaceOidFromUUID(workspaceUUID)
        .then(workspaceOid => {
            return getTypeDefinition(workspaceOid, typeName)
        })
        .then((typeDef) => {
            return getElementNameUUIDFromTypeDef(typeDef, attributeName);
        });
}

module.exports.attributeNameToUUID = attributeNameToUUID;

/*
//manual test code
attributeNameToUUID(
        process.env.WEBHOOK_RALLY_WORKSPACE_UUID,
        "PortfolioItem",
        "Send Epic to SNOW Indicator (DSE ONLY)")
    .then(uuid => console.log(uuid));
attributeNameToUUID(
        process.env.WEBHOOK_RALLY_WORKSPACE_UUID,
        "PortfolioItem",
        "SNOW Status (Don't Touch Admin ONLY)")
    .then(uuid => console.log(uuid));
*/
