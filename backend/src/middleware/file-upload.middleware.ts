import multer from "multer"

const fileUploadMiddleware = (fieldName: string, dir: string = 'user_image') => {
    return multer({
        storage: multer.diskStorage({
            destination: 'uploads/' + dir,
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`)
            }
        }),
        limits: {
            fileSize: 1024 * 1024 * 3,
        },
        fileFilter: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new Error('Only JPEG and PNG images are allowed.'), false);
            }
        }
    }).single(fieldName);
}

export default fileUploadMiddleware