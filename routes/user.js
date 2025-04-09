const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js")
// In place this we will use Router .route
// router.get("/signup", userController.renderSignupForm);

// router.post("/signup", wrapAsync(userController.signup));

// router.get("/login",userController.rendersigninForm)

// router.post("/login",saveRedirectUrl,passport.authenticate("local",{ failureRedirect:"/login",failureFlash:true,}),userController.signin)
// router.get("/logout",userController.logout)

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup))
router.route("/login")
    .get(userController.rendersigninForm)
    .post(saveRedirectUrl,passport.authenticate("local",{ failureRedirect:"/login",failureFlash:true,}),userController.signin)
router.get("/logout",userController.logout)

module.exports = router;