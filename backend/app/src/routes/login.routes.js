import express from "express";
import LoginController from "../controllers/login.controller.js";
import userModel from "../db/models/user.model.js";

const router = express.Router();

const loginController = new LoginController(userModel);

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

export default router;
