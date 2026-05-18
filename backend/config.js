import dotenv from "dotenv";

//Ejecutamos la libreria dotenv
dotenv.config();

export const config = {
    JWT: {
        secret: process.env.JWT_SECRET_KEY
    },
    email: {
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
    },
    cloudinary:{
        cloudinary_name:process.env.CLOUDIANRY_CLOUD_NAME,
        clodinary_api_key: process.env.CLOUDIANRY_SECRET_KEY,
        cloudinary_api_secret: process.env.CLOUDIANRY_API_SECRET
    }
};

export default config;
