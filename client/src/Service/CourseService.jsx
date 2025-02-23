import axios from "axios";


const courseService = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_BASE_URL}${import.meta.env.VITE_BACKEND_COURSE_URL}`
})

export const addCourse = async(data)=>{
    const response = await courseService.post("/add-course",{
        ...data
    },{
        withCredentials:true
    })

    return response;
};

export const updateCourse = async(data)=>{
    const response = await courseService.post("/update-course",{
        ...data
    },{
        withCredentials:true,
        
    }
    );
}


export const addSubCourse = async(data)=>{
    const response = await courseService.post("/add-sub-course",{
        ...data
    },{
        withCredentials:true
    }
    );

    return response;
};


export const deleteCourse = async(data)=>{
    console.log("data",data);
    
    const response = await courseService.post("/delete-course",{
        courseId:data
    },{
        withCredentials:true
    }
    );

    return response;
}

export const getCourseByUniversityId = async(data)=>{
    const response = await courseService.post("/university-courses",{
        ...data
    },{
        withCredentials:true
    }
    );

    return response;
}
export const getCourseByCourseId = async(data)=>{
    const response = await courseService.post("/get-course-by-id",{
        ...data
    },{
        withCredentials:true
    }
    );

    return response;
}

export const getSubCourseByCourseIdAndSubCourseId = async(data)=>{
    const response = await courseService.post("/get-subCourse",{
        ...data
    },{
        withCredentials:true
    }
    );

    return response;
}
export const updateSubCourse = async(data)=>{
    const response = await courseService.post("/update-subCourse",{
        ...data
    },{
        withCredentials:true
    }
    );

    return response;
}

export const searchCourse = async(data)=>{
    const response = await courseService.post(
        "/search-course",
        {
            ...data
        },
        {
            withCredentials: true,
            headers:{
                "Content-Type":"application/json"
            }
        }
    )

    return response;
}


export const getCourseListByUniversityId = async(data)=>{
    const response = await courseService.post("/get-courseName-list-universityId",{
        ...data
    },{
        withCredentials:true
    }
    );

    return response;
}



