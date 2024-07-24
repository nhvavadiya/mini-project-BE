import db from "../models/index.js";

const ROOMSLOT = db.roomSlot;
const BOOKSLOT = db.bookSlot;
const ROOM = db.room;
const HOTEL = db.hotel;

export const bookedSlotList = async (data) => {
  let response = {};
  try {
    const { limit = 10, page_no = 1, admin_id } = data;
    const offset = Number(limit) * (Number(page_no) - 1);
    let bookedSlotStatus = await BOOKSLOT.findAll({
      where: {
        active: 1,
        status: 0,
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
      limit: Number(limit),
      offset: offset,
      order: [["updated_at", "DESC"]],
    });

    response = {
      status: true,
      data: bookedSlotStatus,
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
