import {
    ScanCommand
    } from "@aws-sdk/lib-dynamodb";
    export default async (docClient, tableName) => {
    const command = new ScanCommand({
    TableName: tableName
    });
    const response = await docClient.send(command);
    return response.Items;
    }