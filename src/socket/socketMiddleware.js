import { verifyJWT } from "../helpers/index.js";
import db from "../models/index.js";

const USER = db.user;
const USERSESSION = db.userSession;
export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.authorization;
    if (!token) {
      throw new Error("Please provide authorization token");
    }

    const decode = await verifyJWT(token);

    if (!decode) {
      throw new Error("Please provide authorization token");
    }

    const isAuth = await USERSESSION.findOne({
      where: {
        token,
      },
      attributes: ["user_id"],
    });

    if (!isAuth) {
      throw new Error("unauthorized");
    }

    const user = await USER.findOne({
      where: {
        id: isAuth.user_id,
        active: 1,
      },
      attributes: ["id", "first_name", "email", "role"],
    });
    if (!user) {
      throw new Error("User not found!");
    }
    Object.assign(user, { socket_id: socket.id });
    await user.save();
    if (user.role === "admin") {
      socket.admin = user;
    } else {
      socket.user = user;
    }

    next();
  } catch (e) {
    // console.log("eeeeeeeeeee", e);
    next({ status: false, message: "unauthorized" });
  }
};
