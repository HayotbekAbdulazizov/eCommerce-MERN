// backend/auth-service/src/server.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import AuthRoutes from './routes/AuthRoutes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(AuthRoutes);

const port = 5001;
app.listen(port, () => {
  console.log(`Auth Service запущен на порту ${port}`);
});
