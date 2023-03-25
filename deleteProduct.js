const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { response } = require('../../utils/response');

module.exports.deleteProduct = (event, context, callback) => {
  const productId = event.pathParameters.productId;

  const params = {
    TableName: 'product',
    Key: {
      productId: productId
    }
  };

  dynamoDb.delete(params, (error) => {
    if (error) {
      console.error(error);
      return response(500, { message: 'Failed to delete product' }, callback);
    }
    response(200, { message: 'Product deleted successfully' }, callback);
  });
};