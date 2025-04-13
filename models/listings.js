const { ref } = require("joi");
const mongoose=require("mongoose")
const Schema=mongoose.Schema 
const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        // type:String,
        // default:"https://images.unsplash.com/photo-1509233725247-49e657c54213?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2h8ZW58MHx8MHx8fDA%3D",
        // set:(v)=>v===""?"https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhY2h8ZW58MHx8MHx8fDA%3D":v,
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});
const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing