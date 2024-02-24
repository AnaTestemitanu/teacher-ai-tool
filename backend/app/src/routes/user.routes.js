import express from "express";
import userModel from "../db/models/user.model.js";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

const userController = new UserController(userModel);

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await userController.createUser(email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userController.getUserByID(id);
        if (!user) 
            res.status(404).send("User not found");
        else
            res.json(user);
    } catch (error) {
        console.error("Error getting user by ID:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userController.deleteUser(id);
        if (!user) 
            res.status(404).send("User not found");
        else
            res.send("User deleted");
    } catch (error) {
        console.error("Error getting user by ID:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

export default router;
