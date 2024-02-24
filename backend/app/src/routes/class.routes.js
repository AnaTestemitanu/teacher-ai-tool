import express from "express";
import multer from "multer";
import ClassController from "../controllers/class.controller.js";
import PresentationController from "../controllers/presentation.controller.js";
import classModel from "../db/models/class.model.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

const classController = new ClassController(classModel);
const presentationController = new PresentationController();

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
  try {
    const data = req.body;
    data["UserId"] = req.user.userId;
    if (req.file) {
      data["PdfLink"] = req.file.originalname;
    }
    const pdfText = presentationController.extractTextFromPdf(); // [Tech debt] Remove hard code return
    const response = await classController.createClass(req.body);
    const slides = await presentationController.generateSlides(pdfText, response, { MainLanguage: "english" }); // [Tech debt] Remove profile hard code 
    const keynotes = await presentationController.generateSlideNotes(slides, response, { Age: 30, YearsOfExperience: 10 }) // [Tech debt] Remove profile hard code
    const images = await presentationController.generateSlideImage(slides);
    const presentation = presentationController.combine(slides, keynotes, images);
    await presentationController.generateFile(presentation);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error login user", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
