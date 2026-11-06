import express from 'express';
import router from './api/index.js';;

const app = express();
app.use(express.static('public'));
app.use(express.json());

// Direct all /api/v1 requests to the API router (src/api/index.js)

app.use('/api/v1',router);

export default app;