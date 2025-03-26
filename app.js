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
const wrapAsync=require("./utils/wrapAsync")
const ExpressError=require("./utils/ExpressError")
const listingSchema=require("./schema.js")
const listings=require("./routes/listing.js")
const session=require("express-session")
const flash=require("connect-flash")


app.engine('ejs', ejsMate);
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))
const sessionOption={
    secret:"secretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }
}
app.use(session(sessionOption))
app.use(flash())
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
app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    console.log(res.locals.success)
    res.locals.error=req.flash("error")
    next()
})
app.use("/listings",listings)
app.all("*",( req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!!"))
})
app.use((err,req,res,next)=>{
    let {statuscode=500,message="Something Went Wrong"}=err
    // res.status(statuscode).send(message);
    
    res.render("error.ejs",{err})
    
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})