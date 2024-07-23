import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};
const decryptPassword = async (password, matchPassword) => {
  return bcrypt.compareSync(password, matchPassword);
};

export { encryptPassword, decryptPassword };
