import { successRes, errorRes } from "../../helpers/index.js";
import db from "../../models/index.js";

const ROOMSLOT = db.roomSlot;
const BOOKSLOT = db.bookSlot;

const roomSlotList = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10, page_no = 1 } = req.query;

    const offset = Number(limit) * (Number(page_no) - 1);
    let hotelRooms = await ROOMSLOT.findAll({
      where: {
        active: 1,
        room_id: id,
      },
      include: [
        {
          model: BOOKSLOT,
          attributes: ["slot_id", "status"],
        },
      ],
      limit: Number(limit),
      offset: offset,
    });

    return successRes(res, 3002, hotelRooms);
  } catch (error) {
    console.log(error);
    return errorRes(res, 9000, error);
  }
};

export default roomSlotList;
