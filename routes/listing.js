const express=require("express")
const router=express.Router()

const wrapAsync=require("../utils/wrapAsync")
const listingSchema=require("../schema.js")
const ExpressError=require("../utils/ExpressError")
const Listing=require("../models/listings")
const {isLoggedIn, isOwner}=require("../middleware.js")
const listingController=require("../controllers/listings.js")

//-----------------------doing same work with Router.route-------------
// //Index Route
// router.get("/",wrapAsync(listingController.index))
 
//  //New Route
//  router.get("/new",isLoggedIn,listingController.renderNewForm)
 
//  //show Route
//  router.get("/:id",wrapAsync(listingController.showListing))
 
//  //Create Route
//  router.post("/",isLoggedIn,wrapAsync(listingController.createListing))
 
//  //Edit Route
//  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))
 
//  //Update Route
//  router.put("/:id",isLoggedIn,isOwner,wrapAsync(listingController.updateListing))
 
//  //Delete Route
//  router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))
//  -------------------------below code with Router.route---------------------------
router.get("/new", isLoggedIn, listingController.renderNewForm); 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, wrapAsync(listingController.createListing));

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


module.exports=router;