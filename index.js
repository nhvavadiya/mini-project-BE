import https from "https";
import http from "http";
import fs from "fs";
import config from "./src/config/config.js";
import app from "./src/app.js";
import { Server } from "socket.io";
import { socket } from "./src/socket/index.js";

// Check for protocol
let server;
if (config.protocol === "https") {
  server = https.createServer(
    {
      key: fs.readFileSync(config.certificate.privkey, "utf8"),
      cert: fs.readFileSync(config.certificate.fullchain, "utf8"),
    },
    app,
  );
} else {
  server = http.createServer(app);
}
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

await socket(io);

server.listen(config.port, () => {
  console.log(`server is listening on port ${config.port}`);
});
