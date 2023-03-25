const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getProduct = (event, context, callback) => {
  const productId = event.pathParameters.productId;

  const params = {
    TableName: process.env.PRODUCT_TABLE,
    Key: {
      productId: productId
    }
  };

  dynamodb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Unable to get product.'));
      return;
    }

    if (!result.Item) {
      callback(new Error('Product not found.'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
    callback(null, response);
  });
};