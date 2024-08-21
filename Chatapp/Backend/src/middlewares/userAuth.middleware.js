import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const decode = await jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    console.log(decode);
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in user Authentication  middelware" });
  }
};
