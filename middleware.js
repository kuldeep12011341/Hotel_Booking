module.exports.isLoggedIn=(req,res,next)=>{
    // console.log(req.path,"---------",req.originalUrl);
    if(!req.isAuthenticated()){
        // if user is not logined then we want to save the original url(redirectr url save)
        req.session.redirectUrl=req.originalUrl 
        req.flash("error","you must be  logged in to create listing !")
        return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}