import express from 'express';
import { validateLogin } from '../validatation/login.mjs';
import { Gamer } from '../models/gamer.mjs';
import { limiter } from '../middlewares/limitLogin.mjs';

const router = express.Router();


router.post('/', limiter, async (req, res) => {
    const { name, code } = req.body;

    const error = validateLogin({ userName: name, code: code });
    if (error) {
        let message = error.details[0].message;
        if(message.includes(code)) message = `"Code" must contain only uppercase letters and numbers`;
        return res.status(400).send({ message });
    }

    const gamer = await Gamer.findOne({ userName: name });
    if (!gamer) return res.status(404).send({ message: 'User not found' });

    const match = gamer.gameCodes.find(item => item === code);
    
    if (match) {
        const token = gamer.genrateToken();
        return res.status(200).send({ message: 'Login successful', token});
    }
    else return res.status(400).send({ message: 'Invalid game code' });

});

export default router;