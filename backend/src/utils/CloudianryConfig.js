import multer  from "multer";
import {Cloudinary} from "multer-storage-cloudianry";
import {va as cloudianry} from "cloudinary";
import {config} from "../../config.js";

//1 configuramos cloudunary con nuestras credenciales

cloudianry.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.clodinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

//2 configurar como guardar los images

const storage = new CloudinaryStorage({
    cloudianry,
    params:{
        folder:"grupo2B",
        allowed_formats:["jpg", "png", "jpeg", "gif"]
    }
})

//3 configurar multer

const updated = multer({storage});

export default updated;
