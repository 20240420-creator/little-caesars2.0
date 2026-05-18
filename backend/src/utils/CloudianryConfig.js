import multer  from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import {v2 as cloudinary} from "cloudinary";
import {config} from "../../config.js";

//1 configuramos cloudunary con nuestras credenciales

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.clodinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

//2 configurar como guardar los images

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"grupo2B",
        allowed_formats:["jpg", "png", "jpeg", "gif"]
    }
})

//3 configurar multer

const upload = multer({storage});

export default upload;
