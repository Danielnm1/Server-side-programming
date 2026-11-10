import express from 'express';
import cors from 'cors';
import router from './api/index.js';
import requestTime from './middlewares/request-time.js';
import { notFoundHandler, errorHandler } from './middlewares/error-handlers.js';

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(requestTime);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main API Router
app.use('/api/v1', router);

// Default for all routes not handled by routers above
app.use(notFoundHandler);
// Add error handler middleware as the last middleware in the chain
app.use(errorHandler);

export default app;