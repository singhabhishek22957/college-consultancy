import { Router } from "express";
import {
  addCourse,
  addSubCourse,
  deleteCourse,
  getCourseByCourseId,
  getCourseByUniversityId,
  getSubCourseByCourseIdAndSubCourseId,
  updateCourse,
  updateSubCourse,
} from "../controllers/course.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get((req, res) => {
  res.send("<h1>This is course page</h1>");
});

router.route("*", (req, res) => {
  res.status(404).json({
    message: "route not found",
    statusCode: 404,
    success: false,
  });
});

// add course
router.route("/add-course").post(isAuthenticated, addCourse);

// update course
router.route("/update-course").post(isAuthenticated, updateCourse);

// add sub course
router.route("/add-sub-course").post(isAuthenticated, addSubCourse);

// delete course
router.route("/delete-course").post(isAuthenticated, deleteCourse);

// getCourseByUniversityId
router
  .route("/university-courses")
  .post(isAuthenticated, getCourseByUniversityId);

// get course by course id
router.route("/get-course-by-id").post(isAuthenticated, getCourseByCourseId);

// get sub course

router
  .route("/get-subCourse")
  .post(isAuthenticated, getSubCourseByCourseIdAndSubCourseId);

// update sub course

router.route("/update-subCourse").post(isAuthenticated, updateSubCourse);

export default router;
