const DynamoDB = require('aws-sdk/clients/dynamodb')
const DocumentClient = new.DynamoDB.DocumentClient()
const { USER_TABLES } = process.env
const Chance = require('chance')
const chance = new Chance()

module.exports.handler = async (event) => {
    if (event.triggerSource == 'PostConfirmation_ConfirmSignUp'){
        const name = event.request.userAttributes['name']
        const suffix = chance.string({length: 8, casing: 'upper', alpha: true, numeric:true})
        const screenName = `${name.replace(/[^a-zA-Z0-9]/g, "")}${suffix}`
        cont user = {
            id: event.userName,
            name,
            screenName
            createdAt: new Date().toJSON(),
            followersCount: 0,
            followingCount: 0,
            tweetsCount: 0,
            likeCounts: 0
        }
        await DocumentClient.put({
          TableName: USERS_TABLE,
          Item: USER_TABLES,
          ConditionExpression: 'attribute_not_exists(id)'
      }).promise()
        return event 
    } else {
        return event
    }
} 