import JWT from "jsonwebtoken";

// Doctor authentication middleware
const AuthDoctor = async (req, res, next) => {
  try {

    const { dtoken } = req.headers
    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "not authorized login",
      });
    }

    const token_decode = JWT.verify(dtoken, process.env.JWT_SECRET)
    req.body.docId = token_decode.id
    next();


  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default AuthDoctor;
