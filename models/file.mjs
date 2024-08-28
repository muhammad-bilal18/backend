import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import config from 'config';

const fileSchema = new mongoose.Schema({
    fileType: String,
    fileURL: String
});

export const File = mongoose.model('File', fileSchema);