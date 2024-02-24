import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import sequelize from './db/sequelize.js';
import userRoutes from './routes/user.routes.js';
import loginRoutes from './routes/login.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/users', userRoutes);
app.use('/login', loginRoutes);

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