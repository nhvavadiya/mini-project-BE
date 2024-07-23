import { successRes, errorRes } from "../../helpers/index.js";
import db from "../../models/index.js";

const HOTEL = db.hotel;

const hotelList = async (req, res) => {
  try {
    let hotels = await HOTEL.findAll({
      where: {
        active: 1,
      },
    });

    return successRes(res, 3001, hotels);
  } catch (error) {
    return errorRes(res, 9000, error);
  }
};

export default hotelList;
