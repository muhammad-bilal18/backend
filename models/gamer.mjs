import mongoose from "mongoose";
import Joi from "joi";
import jwt from 'jsonwebtoken';
import config from 'config';

const gamerSchema = new mongoose.Schema({
    userName: String,
    gameCodes: [String]
});

gamerSchema.methods.genrateToken = function() {
    const token = jwt.sign({ _id: this._id, userName: this.userName }, config.get('jwtPrivateKey'));
    return token;
}

export const Gamer = mongoose.model('Gamer', gamerSchema);