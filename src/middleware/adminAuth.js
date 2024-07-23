import { errorRes, verifyJWT } from "../helpers/index.js";
import db from "../models/index.js";
const ADMIN = db.admin;

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return errorRes(res, 2006);
    }
    const { data } = await verifyJWT(token);
    if (data.adminId) {
      req.body.admin_id = data.adminId;
      let checkAdminExist = await ADMIN.findOne({
        where: {
          [db.Sequelize.Op.and]: [
            {
              active: 1,
            },
            {
              id: data.adminId,
            },
          ],
        },
      });
      if (!checkAdminExist) {
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
export default adminAuth;
