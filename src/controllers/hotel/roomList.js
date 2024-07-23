import { successRes, errorRes } from "../../helpers/index.js";
import db from "../../models/index.js";

const ROOMS = db.room;

const roomList = async (req, res) => {
  try {
    const { id } = req.params;
    let hotelRooms = await ROOMS.findAll({
      where: {
        active: 1,
        hotel_id: id,
      },
    });

    return successRes(res, 3002, hotelRooms);
  } catch (error) {
    return errorRes(res, 9000, error);
  }
};

export default roomList;
