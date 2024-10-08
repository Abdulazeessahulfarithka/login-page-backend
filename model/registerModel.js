import mongoose from "mongoose";

const registerSchema= new mongoose.Schema(
    {
        name:{
            type:"String",
            required:"true"
        },
        email:{
            type:"String",
            required:"true"
        },
        password:{
            type:"String",
            required:"true"
        },
        phoneno:{
            type:"String",
            required:"true"
        }
    }
)
export default mongoose.model("register",registerSchema)