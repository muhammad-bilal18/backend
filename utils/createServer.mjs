import express from 'express';
import cors from 'cors';

import generateGameCodes from '../routes/generate-game-codes.mjs';
import login from '../routes/login.mjs';
import resourses from '../routes/resourses.mjs';
import upload from '../routes/upload.mjs';

import { exception } from '../middlewares/exception.mjs';

export default function createServer() {

    const app = express();

    app.use(cors());
    app.use(express.json());


    app.use('/api/generate-game-codes', generateGameCodes);
    app.use('/api/login', login);
    app.use('/api/resourses', resourses);
    app.use('/api/upload', upload);

    app.use(exception);

    return app;
}