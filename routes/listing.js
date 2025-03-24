const express=require("express")
const router=express.Router()

const wrapAsync=require("../utils/wrapAsync")
const listingSchema=require("../schema.js")
const ExpressError=require("../utils/ExpressError")
const Listing=require("../models/listings")

//Index Route
router.get("/",wrapAsync(async (req,res)=>{
    const allListings= await Listing.find({})
    
    res.render("listings/index.ejs",{allListings})
 }))
 
 //New Route
 router.get("/new",(req,res)=>{
     res.render("listings/new.ejs")
 })
 
 //show Route
 router.get("/:id",wrapAsync(async (req,res)=>{
     const {id}=req.params
     const listing=await Listing.findById(id)
     res.render("listings/show.ejs",{listing})
 }))
 
 //Create Route
 router.post("/",wrapAsync(async (req,res,next)=>{
     // let {title,description,price,location,country}=req.body
     // if(!req.body.listing){
     //    throw new ExpressError(400,"Send Valid data for listing..");
     // }
     // console.log("-------------------------------------------------------");
     // console.log(req.body);
     let result=listingSchema.validate(req.body)
     // console.log("-------------------------------------------------------");
     // console.log(result);
     // console.log("---------------------------------------------------------");
     if(result.error){
         throw new ExpressError(400,result.error)
     }
     
     const listing=req.body.listing
     const newListing=new Listing(listing)
     // ---if we check individual it will become bulky.so better to use JOI tool(used to validate schema),
     // if(!newListing.title){
     //     throw new ExpressError(400,"Title is Missing")
     // }
     // if(!newListing.description){
     //     throw new ExpressError(400,"Description is Missing")
     // }
     // if(!newListing.location){
     //     throw new ExpressError(400,"Location is Missing")
     // }
     await newListing.save()
     res.redirect("/listings")
 }))
 
 //Edit Route
 router.get("/:id/edit",wrapAsync(async (req,res)=>{
     let {id}=req.params
     const listing=await Listing.findById(id);
     res.render("listings/edit.ejs",{listing})
 }))
 
 //Update Route
 router.put("/:id",wrapAsync(async (req,res)=>{
     let {id}=req.params
     
     await Listing.findByIdAndUpdate(id,{...req.body.listing})
     res.redirect(`/listings/${id}`)
 }))
 
 //Delete Route
 router.delete("/:id",wrapAsync(async (req,res)=>{
     let {id}=req.params
     await Listing.findByIdAndDelete(id)
     res.redirect("/listings")
 }))
 

module.exports=router;