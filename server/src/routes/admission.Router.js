import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addAdmission } from "../controllers/admission.controllers.js";


const router = Router();


router.route("/").get((req,res)=>{
    res.send("<h1>this is admission page of a university</h1>")
})



// add admission router 

router.route("/add-admission").post(isAuthenticated,addAdmission);

router.route("*",(req,res)=>{
    res.status(404).json({
        message:"route not found",
        statusCode:404,
        success:false
    })
})


export default router;

