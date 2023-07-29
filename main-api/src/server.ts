// backend/main-api/src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserRoutes from './routes/UserRoutes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mern_microservices_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

app.use(UserRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Main API запущен на порту ${port}`);
});