import Providers from "../models/Providers";
import providersModel from "../models/Providers"

import {v2 as cloudinary} from "cloudinary";

//array fr funciones
const providerController = {}


//Select
providerController.getAllProviders = async (req, res) =>{
    try{

        const Providers = await providersModel.find()
        return res.status(200).json(providers)
    }catch (error){
        console.log("error"+error)
        return res.status(500).json({message: "internal server error"})
    }
}

//insert 
providerController.insertProviders= async (req, res) =>{
    try{
        //1 solicitos los datos
        const {name, phone} = req.body;

        const newProviders = new providersModel ({
            name, 
            phone,
            image: req.file.path,
            public_id: req.file.filename,
        });

        await newProviders.save();

        return res.status(200).json({message: "provider saved"})

    }catch (error){
        console.log("error"+error)
        return res.status(500).json({message: "internal saver error"})

    }
};

//Actualizar
providerController.upsateProvider = async (req, res) =>{
try{
const {name, phone} = req.body;
const providerFound = await providersModel.fondById(req.params.id)
const updatedDate = {
    name,
    phone
}
 if(req.file){
    //Eliminar la imagen anterior
    await cloudinary.uploader.destroy(providerFound.public_id)

    updatedDate.image = req.file.pat
    updatedDate.public_id = req.file.filename
 }

 await providersModel.findByIdAndUpadate(
    req.params.ud,
    updatedDate,
     {new: true}
 )
 return res.status(200),json({message: "provider updated"})
}catch (error){
    console.log("error"+error)
    return res.status(500),json({message : "internal server error"});

}
};

providerController.deleteProvider = async (req, res) =>{
    try{
        const providerFound = await providersModel.fondById(req.params.id);

        await cloudinary.uploader.destroy(providerFound.public_id);

        await providersModel.findByIdAndUpadate(req.params.id)

        return res.status(200).json({message: "provider deleted"});
    }catch(error) {
        console.log("error"+error);
            return res.status(500).json({message: "internal server error"+error});
    }
};

export default providerController 
