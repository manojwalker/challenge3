const config = {
    endpoint: "https://cosmosdbteamtwo.documents.azure.com:443/",
    key: "sYdT8C2sPGrsUjRdLlCWhElGshLI2bosZrlcQKbKIuNlJIlSQhfghHE5Gw2dTzOdLMBE0Ei0U64lB2hdxTeYww==",
    databaseId: "challenge3",
    containerId: "ratings",
    partitionKey: { kind: "Hash", paths: ["/rating"] }
  };
  
  module.exports = config;