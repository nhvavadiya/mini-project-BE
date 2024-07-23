import config from "../config/config.js";
import Sequelize from "sequelize";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    operatorsAliases: config.development.operatorsAliases,
    pool: config.development.pool,
    logging: false,
    port: config.development.port,
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// --------------------------------- Models/Table --------------------------------------------//

import userModel from "../models/auth/user.model.js";
import userSessionModel from "../models/auth/userSession.model.js";
import adminModel from "../models/auth/admin.model.js";
import adminSessionModel from "../models/auth/adminSession.model.js";
import hotelModel from "./hotel/hotel.model.js";
import roomModel from "./hotel/room.model.js";
import roomSlotModel from "./hotel/slot.model.js";
import bookSlotModel from "./hotel/bookSlot.model.js";

// Assuming sequelize and Sequelize are already defined
db.user = userModel(sequelize, Sequelize);
db.userSession = userSessionModel(sequelize, Sequelize);
db.admin = adminModel(sequelize, Sequelize);
db.adminSession = adminSessionModel(sequelize, Sequelize);
db.hotel = hotelModel(sequelize, Sequelize);
db.room = roomModel(sequelize, Sequelize);
db.roomSlot = roomSlotModel(sequelize, Sequelize);
db.bookSlot = bookSlotModel(sequelize, Sequelize);

// --------------------------------- relations --------------------------------------------//

db.user.hasMany(db.userSession, { foreignKey: "user_id" });
db.userSession.belongsTo(db.user, { foreignKey: "user_id" });

db.admin.hasMany(db.adminSession, { foreignKey: "admin_id" });
db.adminSession.belongsTo(db.admin, { foreignKey: "admin_id" });

db.hotel.hasMany(db.room, { foreignKey: "hotel_id" });
db.room.belongsTo(db.hotel, { foreignKey: "hotel_id" });

db.room.hasMany(db.roomSlot, { foreignKey: "room_id" });
db.roomSlot.belongsTo(db.room, { foreignKey: "room_id" });

db.roomSlot.hasMany(db.bookSlot, { foreignKey: "room_id" });
db.bookSlot.belongsTo(db.roomSlot, { foreignKey: "room_id" });

db.admin.hasMany(db.hotel, { foreignKey: "admin_id" });
db.hotel.belongsTo(db.admin, { foreignKey: "admin_id" });

db.user.hasMany(db.bookSlot, { foreignKey: "user_id" });
db.bookSlot.belongsTo(db.user, { foreignKey: "user_id" });

db.roomSlot.hasMany(db.bookSlot, { foreignKey: "slot_id" });
db.bookSlot.belongsTo(db.roomSlot, { foreignKey: "slot_id" });

const adminData = [
  {
    first_name: "admin",
    last_name: "test",
    email: "admin@gmail.com",
    password: "$2b$10$UXX0dtkjcw8OFQkhe1H43uICJWeCVL4zxngzYmnj54A1jrsTh9Yd.",
    phone_no: "1234567890",
    active: 1,
  },
  // password : testtest
];
const hotelData = [
  {
    admin_id: 1,
    name: "Royal",
    description: "royal hotel",
    address: "45 asdads asdasd asdasd",
    phone_no: "1234658795",
    active: 1,
  },
];
const roomData = [
  { hotel_id: 1, room_no: 101, bed_count: 2, is_ac_room: 1, active: 1 },
];
const roomSlotData = [
  { room_id: 1, start_time: 1721633400, end_time: 1721635200, active: 1 },
  { room_id: 1, start_time: 1721635200, end_time: 1721637000, active: 1 },
  { room_id: 1, start_time: 1721637000, end_time: 1721638800, active: 1 },
  { room_id: 1, start_time: 1721638800, end_time: 1721640600, active: 1 },
  { room_id: 1, start_time: 1721640600, end_time: 1721642400, active: 1 },
  { room_id: 1, start_time: 1721642400, end_time: 1721644200, active: 1 },
  { room_id: 1, start_time: 1721644200, end_time: 1721646000, active: 1 },
  { room_id: 1, start_time: 1721646000, end_time: 1721647800, active: 1 },
  { room_id: 1, start_time: 1721647800, end_time: 1721649600, active: 1 },
  { room_id: 1, start_time: 1721649600, end_time: 1721651400, active: 1 },
  { room_id: 1, start_time: 1721651400, end_time: 1721653200, active: 1 },
  { room_id: 1, start_time: 1721653200, end_time: 1721655000, active: 1 },
  { room_id: 1, start_time: 1721655000, end_time: 1721656800, active: 1 },
  { room_id: 1, start_time: 1721656800, end_time: 1721658600, active: 1 },
  { room_id: 1, start_time: 1721658600, end_time: 1721660400, active: 1 },
  { room_id: 1, start_time: 1721660400, end_time: 1721662200, active: 1 },
  { room_id: 1, start_time: 1721662200, end_time: 1721664000, active: 1 },
  { room_id: 1, start_time: 1721664000, end_time: 1721665800, active: 1 },
  { room_id: 1, start_time: 1721665800, end_time: 1721667600, active: 1 },
  { room_id: 1, start_time: 1721667600, end_time: 1721669400, active: 1 },
];

db.sequelize.sync({ alter: true }).then(async () => {
  await db.admin.count().then((count) => {
    if (count === 0) {
      db.admin.bulkCreate(adminData);
    }
  });
  await db.hotel.count().then((count) => {
    if (count === 0) {
      db.hotel.bulkCreate(hotelData);
    }
  });
  await db.room.count().then((count) => {
    if (count === 0) {
      db.room.bulkCreate(roomData);
    }
  });
  await db.roomSlot.count().then((count) => {
    if (count === 0) {
      db.roomSlot.bulkCreate(roomSlotData);
    }
  });
  console.log("Database Synced");
});

export default db;
