var jwt = require('jsonwebtoken');

module.exports.issueToken = function(payload) {
  var token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET || "our biggest secret",
        {
            expireInMinutes: 1440 // 24h
        }
    );
  return token;
};

module.exports.verifyToken = function(token, verified) {
  return jwt.verify(token, process.env.TOKEN_SECRET || "our biggest secret", {}, verified);
};