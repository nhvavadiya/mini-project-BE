import { successRes, errorRes } from "../../helpers/index.js";
import db from "../../models/index.js";

const ROOMSLOT = db.roomSlot;
const BOOKSLOT = db.bookSlot;

const roomList = async (req, res) => {
  try {
    const { id } = req.params;
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
    });

    return successRes(res, 3002, hotelRooms);
  } catch (error) {
    return errorRes(res, 9000, error);
  }
};

export default roomList;
