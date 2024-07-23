import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer();

//defining middleware
app.use(cors());
app.use(upload.any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing routes
import routes_v1 from "./routes/index.js";

// defining routes
app.use("/api/v1/", routes_v1);

export default app;
