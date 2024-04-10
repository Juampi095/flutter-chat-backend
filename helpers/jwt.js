const jwt = require("jsonwebtoken");

module.exports = {
  generateJWT: (uid) => {
    return new Promise((resolve, reject) => {
      const payload = { uid };
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        {
          expiresIn: "24h",
        },
        (err, token) => {
          if (err) {
            reject("token could not be generated");
          } else {
            resolve(token);
          }
        }
      );
    });
  },
};
