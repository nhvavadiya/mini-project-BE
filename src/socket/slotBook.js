import db from "../models/index.js";
import Validator from "validatorjs";

const ROOMSLOT = db.roomSlot;
const BOOKSLOT = db.bookSlot;

export const bookSlot = async (data) => {
  let response = {};
  try {
    let validation = new Validator(data, {
      room_id: "required",
      slot_id: "required",
    });

    if (validation.fails()) {
      const firstMessage = Object.keys(validation.errors.all())[0];
      throw { status: false, message: validation.errors.first(firstMessage) };
    }

    const { room_id, slot_id, user_id } = data;

    const currentTimeMS = Date.now();
    const currentTimeSecond = Math.floor(currentTimeMS / 1000);

    const checkSlotTime = await ROOMSLOT.findOne({
      where: {
        id: slot_id,
        room_id: room_id,
      },
    });

    // if (checkSlotTime.start_time < currentTimeSecond) {
    //   throw {status: false,message: "Slot not available!"}
    // }
    const checkBookedSlot = await BOOKSLOT.findOne({
      where: {
        slot_id,
        room_id,
      },
    });
    if (checkBookedSlot) {
      throw { status: false, message: "Slot already booked." };
    }

    const BookSlot = await BOOKSLOT.create({
      slot_id,
      room_id,
      user_id,
    });

    response = {
      status: true,
      message: "Slot booked successfully!",
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
