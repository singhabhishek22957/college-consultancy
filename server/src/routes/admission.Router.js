import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addAdmission, addAdmissionCourse, deleteAdmission, deleteAdmissionCourse, fetchUpdateAdmissionCourse, getAdmission, getAdmissionCourse, getAdmissionYear, updateAdmission, updateAdmissionCourse } from "../controllers/admission.controllers.js";


const router = Router();


router.route("/").get((req,res)=>{
    res.send("<h1>this is admission page of a university</h1>")
})


router.route("*",(req,res)=>{
    res.status(404).json({
        message:"route not found",
        statusCode:404,
        success:false
    })
})



// add admission router 

router.route("/add-admission").post(isAuthenticated,addAdmission);


// get admission by university id and year
router.route("/get-admission").post(isAuthenticated,getAdmission);


// update admission by university id and year
router.route("/update-admission").post(isAuthenticated,updateAdmission);


// delete admission by university id and year
router.route("/delete-admission").post(isAuthenticated,deleteAdmission);


// add admission course 
router.route("/add-admission-course").post(isAuthenticated,addAdmissionCourse);


// get admission year 
router.route("/get-admission-year").post(isAuthenticated,getAdmissionYear);


// fetch update admission course 
router.route("/fetch-update-admission-course").post(isAuthenticated,fetchUpdateAdmissionCourse);


// update admission course 
router.route("/update-admission-course").post(isAuthenticated,updateAdmissionCourse);

// get admission course details

router.route("/get-admission-course").post(isAuthenticated,getAdmissionCourse);

// delete admission course
router.route("/delete-admission-course").post(isAuthenticated,deleteAdmissionCourse);

export default router;

