import express from "express";
import ProfileController from "../controllers/profile.controller.js";
import profileModel from "../db/models/profile.model.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

const profileController = new ProfileController(profileModel);

// [Tech debt] pagination
router.get("/", authenticateToken, async (req, res) => {
  try {
    const profiles = await profileController.getAllProfiles();
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProfile = await profileController.createProfile(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;
      const profile = await profileController.getProfileById(id);
      if (!profile) 
          res.status(404).send("Profile not found");
      else
          res.json(profile);
  } catch (error) {
      console.error("Error getting profile by ID:", error);
      res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
      const { id } = req.params;
      const profile = await profileController.deleteProfile(id);
      if (!profile) 
          res.status(404).send("Profile not found");
      else
          res.send("Profile deleted");
  } catch (error) {
      console.error("Error deleting profile by ID:", error);
      res.status(500).send({ error: "Internal Server Error" });
  }
});

router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await profileController.updateProfile(id, req.body);
    if (!updated) 
        res.status(404).send("Profile not found");
    else
        res.send(updated);
} catch (error) {
    console.error("Error updating profile by ID:", error);
    res.status(500).send({ error: "Internal Server Error" });
}
})

export default router;