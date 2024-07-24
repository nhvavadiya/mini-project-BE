import db from "../models/index.js";

const ROOMSLOT = db.roomSlot;
const BOOKSLOT = db.bookSlot;
const ROOM = db.room;
const HOTEL = db.hotel;

export const acceptBookingRequest = async (data) => {
  let response = {};
  try {
    const { admin_id, room_id, slot_id, booking_id } = data;

    let getBookingSlot = await BOOKSLOT.findOne({
      where: {
        id: booking_id,
        room_id: room_id,
        slot_id: slot_id,
        status: 0,
        active: 1,
      },
      include: [
        {
          model: ROOMSLOT,
          include: [
            {
              model: ROOM,
              include: [
                {
                  model: HOTEL,
                  ...(admin_id && {
                    where: {
                      user_id: admin_id,
                    },
                  }),
                },
              ],
            },
          ],
        },
      ],
    });

    if (!getBookingSlot) {
      throw {
        status: false,
        message: "Slot status is not pending, please verify details.",
      };
    }

    Object.assign(getBookingSlot, { status: 1 });
    await getBookingSlot.save();
    response = {
      status: true,
      message: "Request Accepted.",
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
