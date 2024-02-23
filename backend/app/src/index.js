import 'dotenv/config';
import express from 'express';
import sequelize from './db/sequelize.js';
import userModel from './db/models/user.model.js';

const app = express();

app.route('/').get(async (req, res) => {
  try {
    const users = await userModel.findAll({ logging: console.log });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.NODEJS_LOCAL_PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});