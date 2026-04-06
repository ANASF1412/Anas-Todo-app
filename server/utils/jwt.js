import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_change_in_production";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";

export const generateToken = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to generate token");
  }

  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    }
    throw error;
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
