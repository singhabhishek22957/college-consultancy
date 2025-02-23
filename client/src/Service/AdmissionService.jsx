import axios from "axios";

const admissionService = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}${
    import.meta.env.VITE_BACKEND_ADMISSION_URL
  }`,
});

export const addAdmission = async (data) => {
  const response = await admissionService.post(
    "/add-admission",
    {
      ...data,
    },
    {
      withCredentials: true,
    }
  );

  return response;
};

export const getAdmission = async (data)=>{
    const response = await admissionService.post(
        "/get-admission",
        {
            ...data,
        },
        {
            withCredentials: true,
        }
    );

    return response;
    
}


export const updateAdmission = async (data)=>{
    const response = await admissionService.post(
        "/update-admission",
        {
            ...data,
        },
        {
            withCredentials: true,
        }
    );

    return response;
    
}
export const deleteAdmission = async (data)=>{
    const response = await admissionService.post(
        "/delete-admission",
        {
            ...data,
        },
        {
            withCredentials: true,
        }
    );

    return response;
    
}


export const addAdmissionCourse = async (data)=>{
    console.log("Data of add admission coures : ", data);
    
  const response = await admissionService.post(
      "/add-admission-course",
      {
          ...data,
      },
      {
          withCredentials: true,
      }
  );
  return response;
}


export const getAdmissionYear = async (data)=>{
    const response = await admissionService.post(
        "/get-admission-year",{
          data
        },{
            withCredentials:true
        }
    )

    return response;
    
}


export const fetchUpdateAdmissionCourse = async (data)=>{
    const response = await admissionService.post(
        "/fetch-update-admission-course",{
          data
        },{
            withCredentials:true
        }
    )

    return response;
    
}


export const updateAdmissionCourse = async (data)=>{
    const response = await admissionService.post(
        "/update-admission-course",{
        ...data,
        },{
            withCredentials:true
        }
    )

    return response;
}



export const getAdmissionCourse = async (data)=>{
    const response = await admissionService.post("/get-admission-course",{
        ...data
    },{
        withCredentials:true
    })

    return response;
}


export const deleteAdmissionCourse = async (data)=>{
    const response = await admissionService.post("/delete-admission-course",{
        ...data
    },{
        withCredentials:true
    })

    return response;
}