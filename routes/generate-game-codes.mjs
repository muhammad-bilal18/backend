import express from 'express';
import { validateSignup } from '../validatation/signup.mjs';
import { generateRandomCode } from '../utils/generateCodes.mjs'
import { Gamer } from '../models/gamer.mjs';

const router = express.Router();

router.post('/', async(req, res) => {
    const {name, nums} = req.body;
    const error = validateSignup({userName: name, codeNums: nums})

    if(error) return res.status(400).send(error.details[0].message);

    let gamer = await Gamer.findOne({userName: name});
    if(gamer) return res.status(400).send({ message: 'Username already exist'});
    
    

    const gameCodes = [];
    for (let i = 0; i < nums; i++) {
        gameCodes.push(generateRandomCode());
    }
    gamer = new Gamer({
        userName: name,
        gameCodes
    })
    const result = await gamer.save();

    if(result) return res.status(201).send({ message: 'Codes generated', gameCodes});
    else return res.status(500).send({ message: 'Internal db error' })
});

export default router;