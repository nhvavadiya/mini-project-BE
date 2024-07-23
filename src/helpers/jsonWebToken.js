import jwt from "jsonwebtoken";
import config from "../config/config.js";

const createJWT = async (data) => {
  return jwt.sign({ data }, config.jwt.secretKey, {
    expiresIn: config.jwt.expire,
  });
};
const verifyJWT = async (data) => {
  // console.log("data ::",data);
  return jwt.verify(data, config.jwt.secretKey);
};

export { createJWT, verifyJWT };
