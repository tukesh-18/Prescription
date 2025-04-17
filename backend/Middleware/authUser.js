import JWT from "jsonwebtoken";

// User authentication middleware
const AuthUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorised to login again",
      });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;

    next();

  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default AuthUser;
