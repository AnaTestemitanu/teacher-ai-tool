import express from 'express';
import userModel from '../db/models/user.model.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

const user = new UserController(userModel);

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await user.createUser(email, password);
        res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
      const users = await user.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

export default router;