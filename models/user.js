const { required } = require("joi")
const mongoose=require("mongoose")
const Schema=mongoose.Schema
const passportlocalMongoose=require("passport-local-mongoose")
// const { type } = require("../schema")
const UserSchema=new  Schema({
    email:{
        type:String,
        required:true
    }
})
UserSchema.plugin(passportlocalMongoose)
module.exports=mongoose.model('User',UserSchema)