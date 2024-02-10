import jwt from "jsonwebtoken";

export const requireSignin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_TOKEN_KEY);
      req.user = user;
    } else {
      return res.status(400).json({
        message: "Authorization Required!",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Session Expired",
      payload: error,
    });
  }
};
