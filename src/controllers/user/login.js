import { successRes, errorRes, decryptPassword } from "../../helpers/index.js";
import db from "../../models/index.js";
import Validator from "validatorjs";

const USER = db.user;
const USERSESSION = db.userSession;

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

    let checkUserExist = await USER.findOne({
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
    if (!checkUserExist) {
      return errorRes(res, 1004);
    }

    const checkPassword = await decryptPassword(
      password,
      checkUserExist.password,
    );
    if (!checkPassword) {
      return errorRes(res, 1005);
    }
    let token = await USERSESSION.createToken(checkUserExist.id);

    return successRes(res, 1002, { user: checkUserExist, token: token });
  } catch (error) {
    console.log("error", error);
    return errorRes(res, 9000, error);
  }
};

export default login;
