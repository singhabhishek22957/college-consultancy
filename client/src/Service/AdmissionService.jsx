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
};
