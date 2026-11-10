import express from 'express';
import cors from 'cors';
import router from './api/index.js';
import requestTime from './middlewares/request-time.js';

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(requestTime);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

export default app;