import { slotList } from "./slotList.js";
import { socketAuthMiddleware } from "./socketMiddleware.js";
import { bookSlot } from "./slotBook.js";
import { bookedSlotList } from "./bookedSlotList.js";
import { acceptBookingRequest } from "./acceptBookingReq.js";
import { cancelBookingRequest } from "./cancelBookingReq.js";
export const socket = async (io) => {
  io.use(async function (socket, next) {
    await socketAuthMiddleware(socket, next);
  });
  io.on("connection", (socket) => {
    socket.on("slotList", async (data) => {
      const slotListResponse = await slotList(data);

      if (slotListResponse.status) {
        return io.to(socket.id).emit("getSlotList", slotListResponse);
      } else {
        return io.to(socket.id).emit("getSlotListError", slotListResponse);
      }
    });
    socket.on("bookedSlotList", async (data) => {
      data.admin_id = socket.admin.id;
      const bookedSlotListResponse = await bookedSlotList(data);

      if (bookedSlotListResponse.status) {
        return io
          .to(socket.id)
          .emit("getBookedSlotList", bookedSlotListResponse);
      } else {
        return io
          .to(socket.id)
          .emit("getBookedSlotListError", bookedSlotListResponse);
      }
    });

    socket.on("bookSlot", async (data) => {
      data.user_id = socket.user.id;
      const bookSlotResponse = await bookSlot(data);

      if (bookSlotResponse.status) {
        io.to(socket.id).emit("getBookSlotStatus", bookSlotResponse);
        return io.emit("callSlotListandBookSlotList", {
          room_id: data.room_id,
        });
      } else {
        return io.to(socket.id).emit("getBookSlotError", bookSlotResponse);
      }
    });

    socket.on("acceptBookingRequest", async (data) => {
      data.admin_id = socket.admin.id;
      const acceptedResponse = await acceptBookingRequest(data);

      if (acceptedResponse.status) {
        io.to(socket.id).emit(
          "getAcceptBookingRequestStatus",
          acceptedResponse,
        );
        return io.emit("callSlotListandBookSlotList", {
          room_id: data.room_id,
        });
      } else {
        return io
          .to(socket.id)
          .emit("getAcceptBookingRequestError", acceptedResponse);
      }
    });

    socket.on("cancelBookingRequest", async (data) => {
      data.admin_id = socket.admin.id;
      const cancelledResponse = await cancelBookingRequest(data);

      if (cancelledResponse.status) {
        io.to(socket.id).emit(
          "getCancelBookingRequestStatus",
          cancelledResponse,
        );
        return io.emit("callSlotListandBookSlotList", {
          room_id: data.room_id,
        });
      } else {
        return io
          .to(socket.id)
          .emit("getCancelBookingRequestError", cancelledResponse);
      }
    });
  });
};
