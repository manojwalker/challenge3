var uuid = require('uuid');
const config = require(".config");
const CosmosClient = require("@azure/cosmos").CosmosClient;

module.exports = async function (context, req) {
    context.log('Create Rating Function Triggered');
    debugger;
    const userId = (req.body && req.body.userId);
    const productId = (req.body && req.body.productId);
    const locationName = (req.body && req.body.locationName);
    const rating = (req.body && req.body.rating);
    const userNotes = (req.body && req.body.userNotes);
    debugger;
    if(userId && productId && locationName && rating && userNotes){
        debugger;
        const isUserIdValid = fetch(`https://serverlessohapi.azurewebsites.net/api/GetUser?userId=${userId}`)
                                .then(data => {
                                    if(data){
                                        return true
                                    }
                                    else{
                                        return false
                                    }
                                });
                                debugger;
        const isProductIdValid = fetch(`https://serverlessohapi.azurewebsites.net/api/GetProduct?productId=${productId}`)
                                .then(data => {
                                    if(data){
                                        return true
                                    }
                                    else{
                                        return false
                                    }
                                });
                                debugger;
        if(isUserIdValid && isProductIdValid){
            const itemBody = {
                "id": uuid.v1(),
                "userId": userId,
                "productId": productId,
                "locationName": locationName,
                "rating": rating,
                "userNotes": userNotes
            }
            debugger;
            const { endpoint, key, databaseId, containerId } = config;

            const client = new CosmosClient({ endpoint, key });

            const database = client.database(databaseId);
            const container = database.container(containerId);
            const { resource: createdItem } = await container.items.create(itemBody);

            console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.userId}\r\n`);
        }else{
            context.res = {
                status: 400,
                body: "One or more parameter incorrect"
            }
        }
        

    }
    else{
        context.res = {
            status: 400,
            body: "One or more parameter missing"
        }
    }
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}