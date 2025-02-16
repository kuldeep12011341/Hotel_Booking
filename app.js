const express=require("express")
const ejs=require("ejs");
const Listing=require("./models/listings")
const { default: mongoose } = require("mongoose");
const app=express();
const port=8080
const path=require("path");
const { log } = require("console");
const methodOverride = require('method-override')
const ejsMate=require("ejs-mate")

app.engine('ejs', ejsMate);
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))
main().then(()=>{
    console.log("Connected to database")
})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect("mongodb://localhost:27017/wanderlust")
}


// app.get("/verify",async (req,res)=>{
//     let sampleListing= new Listing({
//         title:"Beautiful Beach House",
//         description:"A beautiful beach house with a view",
//         price:300,
//         location:"Beach",
//         country:"USA"
//     })
//     await sampleListing.save()
//     res.send("data saved successfully...")
// })

//Index Route
app.get("/listings",async (req,res)=>{
   const allListings= await Listing.find({})
   
   res.render("listings/index.ejs",{allListings})
})

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//show Route
app.get("/listings/:id",async (req,res)=>{
    const {id}=req.params
    const listing=await Listing.findById(id)
    res.render("listings/show.ejs",{listing})
})

//Create Route
app.post("/listings",async (req,res)=>{
    // let {title,description,price,location,country}=req.body
    
    const listing=req.body.listing
    const newListing=new Listing(listing)
    await newListing.save()
    res.redirect("/listings")
    
})

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})

//Update Route
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params
    
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
})

//Delete Route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})