const express=require("express")
const router=express.Router()

const wrapAsync=require("../utils/wrapAsync")
const listingSchema=require("../schema.js")
const ExpressError=require("../utils/ExpressError")
const Listing=require("../models/listings")
const {isLoggedIn}=require("../middleware.js")

//Index Route
router.get("/",wrapAsync(async (req,res)=>{
    const allListings= await Listing.find({})
    
    res.render("listings/index.ejs",{allListings})
 }))
 
 //New Route
 router.get("/new",isLoggedIn,(req,res)=>{ 
    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error","you must be  logged in to create listing !")
        return res.redirect("/login")
    }
    res.render("listings/new.ejs")
 })
 
 //show Route
 router.get("/:id",wrapAsync(async (req,res)=>{
     const {id}=req.params
     const listing=await Listing.findById(id).populate("owner")
     if(!listing){
        req.flash("error","Listing youn are looking for is not exits")
        res.redirect("/listings")
     }
     console.log(listing);
     res.render("listings/show.ejs",{listing})
 }))
 
 //Create Route
 router.post("/",isLoggedIn,wrapAsync(async (req,res,next)=>{
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
    //  console.log(req.user);
     newListing.owner=req.user._id
     await newListing.save()
     req.flash("success","New Listing Creted Successfully")
     res.redirect("/listings")
 }))
 
 //Edit Route
 router.get("/:id/edit",isLoggedIn,wrapAsync(async (req,res)=>{
     let {id}=req.params
     const listing=await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing youn are looking for is not exits")
        res.redirect("/listings")
     }
     res.render("listings/edit.ejs",{listing})
 }))
 
 //Update Route
 router.put("/:id",isLoggedIn,wrapAsync(async (req,res)=>{
     let {id}=req.params
     
     await Listing.findByIdAndUpdate(id,{...req.body.listing})
     req.flash("success","Listings Updated successfully")
     res.redirect(`/listings/${id}`)
 }))
 
 //Delete Route
 router.delete("/:id",isLoggedIn,wrapAsync(async (req,res)=>{
     let {id}=req.params
     await Listing.findByIdAndDelete(id)
     req.flash("success","Listing Delted Successfully")
     res.redirect("/listings")
 }))
 

module.exports=router;