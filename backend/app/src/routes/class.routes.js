import express from "express";
import multer from "multer";
import ClassController from "../controllers/class.controller.js";
import classModel from "../db/models/class.model.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

const classController = new ClassController(classModel);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "books");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/", authenticateToken, upload.single("courseBookPdf"), async (req, res) => {
  console.log(req.user);
  try {
    const data = req.body;
    data["UserId"] = req.user.userId;
    if (req.file) {
      data["PdfLink"] = req.file.originalname;
    }
    const response = await classController.createClass(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error login user", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
