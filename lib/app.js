import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import speciesController from './controllers/species.js';
import animalsController from './controllers/animals.js';

const app = express();

app.use(express.json());

app.use('/api/species', speciesController);
app.use('/api/animals', animalsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
