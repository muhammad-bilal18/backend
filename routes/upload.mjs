import { File } from '../models/file.mjs';
import { upload } from '../middlewares/multer.mjs';
import { cloudinary } from '../utils/cloudinary.mjs';
import { auth } from '../middlewares/auth.mjs';

import express from 'express';
const router = express.Router();

const cloud = cloudinary();


router.post('/', auth, upload.single('file'), async (req, res) => {

    const file = req.file;
    let type = file.mimetype.split('/')[0];

    let uploadPreset;

    uploadPreset = (type.includes('image')) ? 'images_preset' : 'videos_preset';

    console.log(file.fieldname, type, uploadPreset);
    
    const result = await cloud.uploader.upload(file.path, {
        upload_preset: uploadPreset,
        resource_type: type
    });
        
    const fileUrl = result.secure_url;

    const newFile = new File({
        fileType: type,
        fileURL: fileUrl
    })

    const respond = await newFile.save();
    if(respond) res.status(200).send({ message: 'File added successfully' });
    else return res.status(500).send({ message: 'Internal db error' });
});

export default router;