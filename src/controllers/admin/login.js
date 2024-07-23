import { successRes, errorRes, decryptPassword } from "../../helpers/index.js";
import db from "../../models/index.js";
import Validator from "validatorjs";

const ADMIN = db.admin;
const ADMINSESSION = db.adminSession;

const login = async (req, res) => {
  try {
    let validation = new Validator(req.body, {
      email: "required",
      password: "required",
    });

    if (validation.fails()) {
      const firstMessage = Object.keys(validation.errors.all())[0];
      return errorRes(res, validation.errors.first(firstMessage));
    }
    let { email, password } = req.body;
    let checkAdminExist = await ADMIN.findOne({
      where: {
        [db.Sequelize.Op.and]: [
          {
            active: 1,
          },
          {
            email: email,
          },
        ],
      },
    });
    if (!checkAdminExist) {
      return errorRes(res, 2004);
    }

    const checkPassword = await decryptPassword(
      password,
      checkAdminExist.password,
    );
    if (!checkPassword) {
      return errorRes(res, 2005);
    }
    let token = await ADMINSESSION.createToken(checkAdminExist.id);

    return successRes(res, 2002, { admin: checkAdminExist, token: token });
  } catch (error) {
    return errorRes(res, 9000, error);
  }
};

export default login;
