import multer from "multer"
import path from "path";


const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        const uploadPath = path.join(process.cwd(), "src/uploads/temp");
        cb(null, uploadPath);
      },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})

export const upload = multer({storage})

