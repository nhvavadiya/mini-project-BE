import { successRes, errorRes } from "../../helpers/index.js";
import db from "../../models/index.js";
import Validator from "validatorjs";

const ROOMSLOT = db.roomSlot;
const BOOKSLOT = db.bookSlot;

const bookSlot = async (req, res) => {
  try {
    let validation = new Validator(req.body, {
      room_id: "required",
      slot_id: "required",
    });

    if (validation.fails()) {
      const firstMessage = Object.keys(validation.errors.all())[0];
      return errorRes(res, validation.errors.first(firstMessage));
    }

    const { room_id, slot_id, user_id } = req.body;

    const currentTimeMS = Date.now();
    const currentTimeSecond = Math.floor(currentTimeMS / 1000);

    const checkSlotTime = await ROOMSLOT.findOne({
      where: {
        id: slot_id,
        room_id: room_id,
      },
    });

    if (checkSlotTime.start_time < currentTimeSecond) {
      return errorRes(res, 3005);
    }
    const checkBookedSlot = await BOOKSLOT.findOne({
      where: {
        slot_id,
        room_id,
      },
    });
    if (checkBookedSlot) {
      return errorRes(res, 3006);
    }

    const BookSlot = await BOOKSLOT.create({
      slot_id,
      room_id,
      user_id,
    });

    return successRes(res, 3004);
  } catch (error) {
    console.log(error);
    return errorRes(res, 9000, error);
  }
};

export default bookSlot;
