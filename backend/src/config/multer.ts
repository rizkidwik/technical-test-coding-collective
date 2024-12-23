import multer from 'multer'
import path from 'path'
import fs from 'fs'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname,'uploads')
        
        fs.mkdirSync(uploadPath, {recursive: true})

        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif']

        if(allowedMimes.includes(file.mimetype)){
            cb(null,true)
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed'))
        }
    }
})