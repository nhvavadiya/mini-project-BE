import { errorRes, verifyJWT } from "../helpers/index.js";
import db from "../models/index.js";
const USER = db.user;

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return errorRes(res, 2006);
    }
    const { data } = await verifyJWT(token);
    if (data.userId) {
      req.body.user_id = data.userId;
      let checkUserExist = await USER.findOne({
        where: {
          [db.Sequelize.Op.and]: [
            {
              active: 1,
            },
            {
              id: data.userId,
            },
          ],
        },
      });
      if (!checkUserExist) {
        return errorRes(res, 1006);
      }
    } else {
      return errorRes(res, 1006);
    }
    next();
  } catch (error) {
    console.log("error", error);
    return errorRes(res, 9000, error);
  }
};
export default userAuth;
