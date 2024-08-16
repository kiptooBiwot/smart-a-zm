const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const client = require('./redis.init')
// const client = require("./redis.init");

module.exports = {
  signAccessToken: (user) => {
    // console.log(`USER SING ACCESS TOKEN ${user}`)
    return new Promise((resolve, reject) => {
      (payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        isEnabled: user.isEnabled,
      }),
        (secret = process.env.ACCESS_TOKEN_SECRET),
        (options = {
          expiresIn: "30d",
        });
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          // console.log(err);
          return reject(createError.InternalServerError());
        }
        // console.log(`TOKEN GENERATED: ${token}`)
        resolve(token);
      });
    });
  },
  verifyAccessToken: async (req, res, next) => {
    if (!req.headers["authorization"])

      throw next(
        createError.Unauthorized("Please sign in to access this resource")
      );

    const authHeader = req.headers["authorization"]
    // console.log(`AUTHORIZATION: ${authHeader}`)
    const token = authHeader.split(" ")[1]
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = decoded
      next()
    } catch (err) {
      if (err.name === "JsonwebTokenError") {
        createError.Unauthorized();
      } else {
        next(createError.Unauthorized(err.message))
      }
    }
  },
  signRefreshToken: (user) => {
    // console.log(`signRefreshToken ${user}`)
    return new Promise((resolve, reject) => {
      (payload = {
        id: user.id,
        role: user.role,
        isEnabled: user.isEnabled,
      }),
        (secret = process.env.REFRESH_TOKEN_SECRET);
      options = {
        expiresIn: "1y",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          // console.log(err);
          return reject(createError.InternalServerError());
        }

        // console.log(`REFRESH TOKEN user.id: ${user.id}`)
        // console.log(`Token: ${token}`)
        // Store the refresh token in Redis server
        client.set(user.id, token, "EX", 365 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            // console.log(err);
            return reject(createError.InternalServerError());
          }
          // console.log(`REFRESH TOKEN TOKEN: ${token}`)
          resolve(token);
        });
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      if (!refreshToken) throw next(createError.Unauthorized());

      const token = refreshToken.split(" ")[1];
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        const userId = payload.id;

        // Check the token from Redis server if it exists
        client.GET(userId, (err, reply) => {
          if (err) {
            // console.log(err);
            reject(createError.InternalServerError());
            return;
          }
          // console.log(`REDIS REPLY: ${reply} ${reply === token}`);
          // Check if the token matches the redis-stored token
          if (token === reply) return resolve(userId);
          // If tokens did not match
          reject(createError.Unauthorized());
        });
        // resolve(userId);
      });
    });
  },


  // Manage the user roles
  authorize: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        res.stats(403).json({ status: false, message: "You don't have permissions to access this resource" })
      }
      next()
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else {
      next(
        createError.Unauthorized(
          "Only administrators are allowed access this resource. Thank you."
        )
      );
    }
  },
  isFarmer: (req, res, next) => {
    if (req.user.role === "farmer") {
      next();
    } else {
      next(createError.Unauthorized("This route is above your grade level!"));
    }
  },

  // RECOVER PASSWORD HELPERS
  // LOST PASSWORD TOKEN
  createRecoverPasswordToken: ({ password, id, createdAt }) => {
    const secret = password + "-" + createdAt
    const token = jwt.sign({ id }, secret, {
      expiresIn: 3600, // 1 Hour
    })
    return token
  },
};
