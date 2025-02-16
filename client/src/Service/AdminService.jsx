import axios from "axios";

const adminService = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}${
    import.meta.env.VITE_BACKEND_USER_URL
  }`,
});

export const adminLogin = async (data) => {
  const response = await adminService.post("/login", data, {
    withCredentials: true,
  });

  return response;
};

export const getUsers = async () => {
  const response = await adminService.get("/getUser", {
    withCredentials: true, // Include credentials (cookies)
  });

  return response;
};

export const logoutUser = async () => {
  const response = await adminService.post(
    "/logout",
    {},
    {
      withCredentials: true,
    }
  );
};
