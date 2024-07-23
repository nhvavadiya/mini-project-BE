import db from "../../models/index.js";
import { successRes, errorRes } from "../../helpers/index.js";
import { encryptPassword } from "../../helpers/index.js";
import Validator from "validatorjs";

const ADMIN = db.admin;
const ADMINSESSION = db.adminSession;

const register = async (req, res) => {
  try {
    let validation = new Validator(req.body, {
      first_name: "required",
      email: "required",
      password: "required",
    });

    if (validation.fails()) {
      const firstMessage = Object.keys(validation.errors.all())[0];
      return errorRes(res, validation.errors.first(firstMessage));
    }

    let { email, first_name, last_name, password, phone_no } = req.body;
    const checkAdminExist = await ADMIN.isExistField("email", email);
    if (checkAdminExist) {
      return errorRes(res, 2003);
    }

    let encryptedPass = await encryptPassword(password);
    let data = {
      first_name: first_name ? first_name : "",
      last_name: last_name ? last_name : "",
      email: email ? email : "",
      password: encryptedPass,
      phone_no: phone_no ? phone_no : "",
    };
    let admin = await ADMIN.create(data);
    let token = await ADMINSESSION.createToken(admin.id);

    return successRes(res, 2001, token);
  } catch (error) {
    return errorRes(res, 9000, error);
  }
};

export default register;
