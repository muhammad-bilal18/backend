import { auth } from '../middlewares/auth.mjs';
import { File } from '../models/file.mjs';

import express from 'express';
const router = express.Router();

router.get('/', auth, async(req, res) => {
    let files = []
    files = await File.find({});

    res.status(200).json({ message: 'All resources are yours' });
})

export default router;