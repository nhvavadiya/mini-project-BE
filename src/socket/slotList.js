import db from "../models/index.js";

const ROOMSLOT = db.roomSlot;
const BOOKSLOT = db.bookSlot;

export const slotList = async (data) => {
  let response = {};
  try {
    const { room_id, limit = 10, page_no = 1 } = data;
    const offset = Number(limit) * (Number(page_no) - 1);
    let roomSlot = await ROOMSLOT.findAll({
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

    response = {
      status: true,
      room_id,
      data: roomSlot,
    };
  } catch (error) {
    response = {
      status: false,
      message: error.message,
    };
  } finally {
    return response;
  }
};
