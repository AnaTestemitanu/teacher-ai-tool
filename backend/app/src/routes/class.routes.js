import express from "express";
import multer from "multer";
import ClassController from "../controllers/class.controller.js";
import PresentationController from "../controllers/presentation.controller.js";
import ProfileController from "../controllers/profile.controller.js";
import classModel from "../db/models/class.model.js";
import profileModel from "../db/models/profile.model.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

const classController = new ClassController(classModel);
const profileController = new ProfileController(profileModel);
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
    const profile = await profileController.getProfileByUserId(req.user.userId);
    const pdfText = presentationController.extractTextFromPdf(); // [Tech debt] Remove hard code return
    const classData = await classController.createClass(req.body);
    const slides = await presentationController.generateSlides(pdfText, classData, profile);
    const keynotes = await presentationController.generateSlideNotes(slides, classData, profile) // [Tech debt] Remove profile hard code
    const images = await presentationController.generateSlideImage(slides);
    const presentation = presentationController.combine(slides, keynotes, images);
    await presentationController.generateFile(presentation, classData);
    res.status(201).json(classData);
  } catch (error) {
    console.error("Error login user", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
