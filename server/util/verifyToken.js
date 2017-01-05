const jwt = require('jsonwebtoken');
const secret_key = 'secret_key';

module.exports = function verifyToken(token) {
  const data = jwt.verify(token, secret_key);
  return data.token;
}