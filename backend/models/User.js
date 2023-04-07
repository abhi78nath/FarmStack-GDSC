const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:'farmer'
    },
    address:{
        type:String
        // required:true
    },
    phone:{
        type:Number,
        default:91
    },
    roomId:{
        type:String

    },

    date:{
        type:Date,
        default:Date.now
    },

});

module.exports=mongoose.model("user",UserSchema);