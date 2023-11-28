import {
    PutCommand,
} from "@aws-sdk/lib-dynamodb";

export default async (docClient, tableName, feedback, id) => {
    const command = new PutCommand({
        TableName: tableName,
            Item: {...feedback, FeedbackID: id},
        });
    const response = await docClient.send(command);
    return {...feedback, id: id};
}
