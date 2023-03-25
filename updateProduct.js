const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const productId = event.pathParameters.productId;
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.PRODUCT_TABLE,
    Key: {
      productId: productId
    },
    UpdateExpression: "set productName = :n, productDescription = :d, productPrice = :p, productImage = :i",
    ExpressionAttributeValues: {
      ":n": data.productName,
      ":d": data.productDescription,
      ":p": data.productPrice,
      ":i": data.productImage
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const result = await dynamoDB.update(params).promise();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result)
    });
  } catch (error) {
    console.log(error);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(error)
    });
  }
};