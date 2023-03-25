const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'product',
    Item: {
      productId: uuid.v1(),
      productName: data.productName,
      productDescription: data.productDescription,
      productPrice: data.productPrice,
      productImage: data.productImage
    }
  };

  try {
    const result = await dynamoDB.put(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
    callback(null, response);
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 500,
      body: JSON.stringify('Error creating product')
    };
    callback(null, response);
  }
};