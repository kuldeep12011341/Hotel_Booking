const User=require("../models/user")
module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs");
}
module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser,(err)=>{
        if(err) return next(err)     
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
        })

    } catch (error) {
        req.flash("error",error.message)
        res.redirect("/signup");
    }
}

module.exports.rendersigninForm=(req,res)=>{
    res.render("users/signin.ejs");
}
module.exports.signin=async (req,res)=>{
    req.flash("success","welcome back  to wanderlust !")
    // res.redirect("/listings")
    // i want that it will not redirect to listing
    let redirectUrl=res.locals.redirectUrl ||"/listings"
    res.redirect(redirectUrl)
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err)
        }
        req.flash("success","you are logged Out")
        res.redirect("/listings")
    })
}