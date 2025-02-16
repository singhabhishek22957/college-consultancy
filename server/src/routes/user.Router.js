import { Router } from "express";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

// default route 
router.route("/").get((req,res)=>{
    res.send("<h1>This is user page</h1>")
})


// login user 
router.route("/login").post(loginUser)


// register user 
router.route("/register").post(upload.fields([{name:"avatar",maxCount:1}]),registerUser)

// logout user
router.route("/logout").post(isAuthenticated,logoutUser)

// get user
router.route("/getUser").get(isAuthenticated,getUser)

router.route("*", (req, res) => {
    res.status(404).json({
        message: "route not found",
        statusCode: 404,
        success: false,
    });
});

export default router