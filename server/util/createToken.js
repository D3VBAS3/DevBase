const jwt = require('jsonwebtoken');
const secret_key = 'secret_key';

module.exports = function createToken(user_id) {
  const token = jwt.sign({token: user_id}, secret_key);
  return token;
}