import inserir_feedback from './inserir_feedback.mjs';
import obter_feedbacks from './obter_feedbacks.mjs';
import obter_feedback from './obter_feedback.mjs';

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from
"@aws-sdk/lib-dynamodb";

const funcoes = {
"POST": ({docClient, tableName, payload, id}) =>
inserir_feedback(docClient, tableName, payload, context.awsRequestId),
"GET": ({docClient, tableName, id}) => id === "all" ?
obter_feedbacks(docClient, tableName) : obter_feedback(docClient, tableName,
id)
}

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = "Feedback";

export const handler = async (event, context) => {
const {method, payload, id} = event

try{
return funcoes[method]({docClient, tableName, payload, id});
}
catch (e){
console.log(event);
return event;
}

};