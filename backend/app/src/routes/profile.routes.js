import express from "express";
import ProfileController from "../controllers/profile.controller.js";
import profileModel from "../db/models/profile.model.js";

const router = express.Router();

const profileController = new ProfileController(profileModel);

router.get("/", async (req, res) => {
  try {
    const profiles = await profileController.getAllProfiles();
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;