import {Schema, model} from "mongoose";
const providerSchema = new Schemea ({
    name: {type: String},
    phone: {type: String},
    image: {type: String},
    public_id: {type: String},
},{
    timestamps: true,
    string: false
})

export default model ("Providers", providerSchema)
