const Listing=require("../models/listings")
module.exports.index=async (req,res)=>{
    const allListings= await Listing.find({})  
    res.render("listings/index.ejs",{allListings})
}

module.exports.renderNewForm=(req,res)=>{ 
    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error","you must be  logged in to create listing !")
        return res.redirect("/login")
    }
    res.render("listings/new.ejs")
}

module.exports.showListing=async (req,res)=>{
     const {id}=req.params
     const listing=await Listing.findById(id).populate("owner")
     if(!listing){
        req.flash("error","Listing youn are looking for is not exits")
        res.redirect("/listings")
     }
    //  console.log(listing);
     res.render("listings/show.ejs",{listing})
}

module.exports.createListing=async (req,res,next)=>{
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
}

module.exports.renderEditForm=async (req,res)=>{
     let {id}=req.params
     const listing=await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing youn are looking for is not exits")
        res.redirect("/listings")
     }
     res.render("listings/edit.ejs",{listing})
}

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params
    //It is better not write code again and again for AUTHOROZATION.....its better to create middleware
   //  let listing=await Listing.findById(id)
   //  if(!listing.owner.equals(res.locals.currUser._id)){
   //     req.flash("error","You dont have permission to edit")
   //     return res.redirect(`/listings/${id}`)
   //  }
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    req.flash("success","Listings Updated successfully")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing Delted Successfully")
    res.redirect("/listings")
}