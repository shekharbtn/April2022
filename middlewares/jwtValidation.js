const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

class JwtValidation {
  generateToken = (userId) => {
    try {
      if (!userId) {
        throw {
          message: "UserId is required to generate token",
          status: 400,
        };
      }
      const token = jwt.sign({ userId }, secret, { expiresIn: "10h" });
      return {
        message: "JWT token generated successfully",
        status: 200,
        error: false,
        data: token,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status || 400,
        error: true,
      };
    }
  };

  verifyToken = (res, req, next) => {
    try {
      const token = req.headers["authorization"];
      const data = jwt.verify(token, secret);
      req.userId = data.userId;
      next();
    } catch (error) {
      return res.status(error.status || 400).send({
        message: error.message,
        status: error.status || 400,
        error: true,
      });
    }
  };
}

module.exports = new JwtValidation();
