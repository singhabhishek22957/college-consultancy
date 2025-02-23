import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./Layout/layout.jsx";
import AdminRegister from "./Components/AdminRegister.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import AdminPanel from "./Components/AdminPanel.jsx";
// import Test from "./Components/User/Test.jsx";
import Test from "./Components/Universities/Test.jsx";
import AddAdmission from "./Components/Universities/Admission/AddAdmission.jsx";
import AddUniversity from "./Components/Universities/AddUniversity.jsx";
import ShowUniversities from "./Components/Universities/ShowUniversities.jsx";
import ArchiveUniversityList from "./Components/Universities/ArchiveUinversityList.jsx";
import AdminProfile from "./Components/User/AdminProfile.jsx";
import UpdateUniversity from "./Components/Universities/UpdateUniversity.jsx";
import AddCourse from "./Components/Universities/Course/AddCourse.jsx";
import CourseList from "./Components/Universities/Course/CourseList.jsx";
import AddSubCourse from "./Components/Universities/Course/AddSubCourse.jsx";
import UpdateSubCourse from "./Components/Universities/Course/UpdateSubCourse.jsx";
import UpdateCourse from "./Components/Universities/Course/UpdateCourse.jsx";
import GetAdmission from "./Components/Universities/Admission/GetAdmission.jsx";
import UpdateAdmission from "./Components/Universities/Admission/UpdateAdmission.jsx";
import AddAdmissionCourse from "./Components/Universities/Admission/AddAdmissionCourse.jsx";
import UpdateAdmissionCourse from "./Components/Universities/Admission/UpdateAdmissionCourse.jsx";
import ShowAdmissionCourse from "./Components/Universities/Admission/ShowAdmissionCourse.jsx";



export const router = createBrowserRouter(
    createRoutesFromElements(
        // <Route path="/" element={<App/>} />
        <Route path="/" element={<Layout/>} >
        <Route path="*" element={<h1 className=" text-9xl text-red-700">Page not found</h1>} />    
        <Route path="/" element={<App/>} />
        

        // admin routes

        <Route path="/register" element={<AdminRegister/>} />
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/admin" element={<AdminPanel/>} />
        <Route path="/profile" element={<AdminProfile/>} />
        <Route path="/test" element={<Test/>}/>

        // university routes
        <Route path="/add-university" element={<AddUniversity/>} />
        <Route path="/show-universities" element={<ShowUniversities/>} />
        <Route path="/archive-university" element={<ArchiveUniversityList/>} /> 
        <Route path="/update-university" element={<UpdateUniversity/>} />

        // course routes
        <Route path="/add-course" element={<AddCourse/>}/>
        <Route path="/update-course/:courseId" element={<UpdateCourse/>}/>
        <Route path="/course-list" element={<CourseList/>}/>
        <Route path="/add-sub-course/:courseId" element={<AddSubCourse/>}/>
        <Route path="/edit-subCourse/:courseId/:subCourseId" element={<UpdateSubCourse/>}/>


        // admission routes

        <Route path="/add-admission" element={<AddAdmission/>}/>

        <Route path="/show-admission" element={<GetAdmission/>}/>

         <Route path="/university/update-admission/:universityId/:year" element={<UpdateAdmission/>}/>


        <Route path="/add-admission-course" element={<AddAdmissionCourse/>}/>
        <Route path="/update-admission-course/:universityId/:year/:courseId" element={<UpdateAdmissionCourse/>}/>
        <Route path="/university/show-admission-course/:universityId/:year" element={<ShowAdmissionCourse/>}/>
        

        </Route>

        
        
    )
)