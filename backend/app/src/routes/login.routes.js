import express from "express";
import jwt from 'jsonwebtoken';
import LoginController from "../controllers/login.controller.js";
import profileModel from "../db/models/profile.model.js";
import userModel from "../db/models/user.model.js";

const router = express.Router();

const loginController = new LoginController(userModel, profileModel);

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginController.login(email, password);
    if (data.error) 
        res.status(400).send("Invalid email or password");
    else
        res.status(200).json({ token: data.token });
  } catch (error) {
    console.error("Error login user", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, ...data } = req.body;
    const response = await loginController.register(email, password, data);
    const token = jwt.sign({ userId: response.user.id}, process.env.JWT_SECRET, { expiresIn: '5h' })
    res.status(200).json({ token, data: response });
  } catch (error) {
    console.error("Error login user", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
