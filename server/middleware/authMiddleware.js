const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;

      next();

    } catch (error) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token provided"
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("User Role:", req.user.role);
    console.log("Allowed Roles:", roles);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
        userRole: req.user.role,
        allowedRoles: roles,
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize
};