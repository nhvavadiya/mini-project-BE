import dotenv from "dotenv";
dotenv.config();

export default {
  protocol: process.env.PROTOCOL || "http",
  port: process.env.PORT || 3000,
  development: {
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD || "",
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: process.env.DB_PORT,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expire: process.env.JWT_EXPIRE_TIME,
  },
  certificate: {
    privkey: process.env.CERTIFICATE_PRIVATE_KEY,
    fullchain: process.env.CERTIFICATE_FULLCHAIN,
  },
};
