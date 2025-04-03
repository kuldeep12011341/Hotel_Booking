const mongoose=require("mongoose")
const initData=require("./data.js")
const Listing=require("../models/listings.js")
main().then(()=>{
    console.log("Connected to database")
})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect("mongodb://localhost:27017/wanderlust")
}
const initDB=async ()=>{
    await Listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({...obj,owner:"67e63bbe85920b2bac0a5b23"}))
    await Listing.insertMany(initData.data)
    console.log("data was initialized");
}
initDB()