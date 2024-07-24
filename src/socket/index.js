import db from "../models/index.js";

const ROOMSLOT = db.roomSlot;
const BOOKSLOT = db.bookSlot;
export const socket = async (io) => {
  io.on("connection", (socket) => {
    socket.on("slotList", async (data) => {
      const { room_id, limit = 10, page_no = 1 } = data;
      const offset = Number(limit) * (Number(page_no) - 1);
      let hotelRooms = await ROOMSLOT.findAll({
        where: {
          active: 1,
          room_id: room_id,
        },
        include: [
          {
            model: BOOKSLOT,
            attributes: ["slot_id", "status"],
          },
        ],
        limit: Number(limit),
        offset: offset,
        order: [["id", "DESC"]],
      });
      io.to(socket.id).emit("getSlotList", hotelRooms);
    });
  });
};
