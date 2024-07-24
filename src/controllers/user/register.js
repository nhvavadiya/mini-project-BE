import db from "../../models/index.js";
import { successRes, errorRes } from "../../helpers/index.js";
import { encryptPassword } from "../../helpers/index.js";
import Validator from "validatorjs";

const USER = db.user;
const USERSESSION = db.userSession;

const register = async (req, res) => {
  try {
    let validation = new Validator(req.body, {
      first_name: "required",
      email: "required",
      password: "required",
      role: "required",
    });

    if (validation.fails()) {
      const firstMessage = Object.keys(validation.errors.all())[0];
      return errorRes(res, validation.errors.first(firstMessage));
    }

    let { email, first_name, last_name, password, phone_no, role } = req.body;
    const checkUserExist = await USER.isExistField("email", email);
    if (checkUserExist) {
      return errorRes(res, 1003);
    }

    let encryptedPass = await encryptPassword(password);
    let data = {
      first_name: first_name ? first_name : "",
      last_name: last_name ? last_name : "",
      email: email,
      password: encryptedPass,
      phone_no: phone_no ? phone_no : "",
      role: role,
    };
    let user = await USER.create(data);
    let token = await USERSESSION.createToken(user.id);

    return successRes(res, 1001, token);
  } catch (error) {
    return errorRes(res, 9000, error);
  }
};

export default register;
