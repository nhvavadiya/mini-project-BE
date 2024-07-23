const MESSAGES = {
  1001: "User register successfully!",
  1002: "User login successfully!",
  1003: "User already exists!",
  1004: "User not found!",
  1005: "Your credentials does not match. please try again!",
  1006: "Please provide valid authorization token.",
  1007: "User Profile update successfully!",

  2001: "Admin register successfully!",
  2002: "Admin login successfully!",
  2003: "Admin already exists!",
  2004: "Admin not found!",
  2005: "Your credentials does not match. please try again!",
  2006: "Please provide authorization token.",

  3001: "Hotel list get successfully!",
  3002: "Hotel room list get successfully!",
  3003: "Hotel room-slot list get successfully!",
  3004: "Slot booked successfully!",
  3005: "Slot not available!",
  3006: "Slot already booked.",

  9000: "Something went wrong!",
};

const getMessage = function (messageCode) {
  if (isNaN(messageCode)) {
    return messageCode;
  }
  return messageCode ? MESSAGES[messageCode] : "";
};

export default getMessage;
