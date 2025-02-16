import { Router } from "express";
import { ArchiveUin, deleteArchiveUniversity, getAllArchiveUniversities, getAllUniversities, getUniversityByIdAndName, restoreArchiveUniversity, searchUniversities, universityRegister, updateUniversity } from "../controllers/university.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const router= Router();

router.route("/").get((req,res)=>{
    res.send("<h1>This is university page</h1>")
})

// const upload = multer().fields([
//     { name: "logoImage", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 }  // Add more if needed
// ]);
// university register
router.route("/register").post(isAuthenticated,upload.fields([{name:"logoImage",maxCount:1},{name:"coverImage", maxCount:1}]),universityRegister)

// get all universities
router.route("/get-universities-list").get(getAllUniversities)

// archive university
router.route("/archive-universities").post(isAuthenticated,ArchiveUin)

// get archived universities
router.route("/get-archived-universities").get(isAuthenticated,getAllArchiveUniversities);

// delete archive university university
 router.route("/delete-archive-university").post(isAuthenticated,deleteArchiveUniversity)


 // restored Archive University 
 router.route("/restored-archive-university").post(isAuthenticated,restoreArchiveUniversity)

 // get university by id and name 
 router.route("/get-university").post(isAuthenticated,getUniversityByIdAndName)


 // searchUNiversities 
 router.route("/search-universities").post(isAuthenticated,searchUniversities)
 
// update university 
router.route("/update-university").post(isAuthenticated,upload.fields([{name:"logoImage",maxCount:1},{name:"coverImage", maxCount:1}]),updateUniversity)

router.route("*", (req, res) => {
    res.status(404).json({
        message: "route not found",
        statusCode: 404,
        success: false,
    });
});


export default router