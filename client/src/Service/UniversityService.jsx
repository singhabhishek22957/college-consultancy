import axios from "axios";

const universityService = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}${
    import.meta.env.VITE_BACKEND_UNIVERSITY_URL
  }`,
});

export const registerUniversity = async (data) => {
  const response = await universityService.post(
    "/register",
    {
      ...data,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const getAllUniversities = async () => {
  const response = await universityService.get("/get-universities-list", {
    withCredentials: true,
  });
  return response;
};

export const archiveUniversity = async (data) => {
  const response = await universityService.post(
    "/archive-universities",
    {
      ...data,
    },
    {
      withCredentials: true,
    }
  );
  return response;
};

export const getAllArchiveUniversities = async () => {
  const response = await universityService.get("/get-archived-universities", {
    withCredentials: true,
  });
  return response;
};

export const deleteArchiveUniversity = async (data) => {
  const response = await universityService.post(
    "/delete-archive-university",
    {
      ...data,
    },
    {
      withCredentials: true,
    }
  );
  return response;
};

export const restoredArchiveUniversity = async (data) => {
  const response = await universityService.post(
    "/restored-archive-university",
    {
      ...data,
    },
    {
      withCredentials: true,
    }
  );

  return response;
};

export const getUniversityByIdAndName = async (data) => {
  const response = await universityService.post(
    "/get-university",
    {
      ...data,
    },
    {
      withCredentials: true,
    }
  );
  return response;
};

export const searchUniversity = async (data) => {
  console.log("data", data);
  const response = await universityService.post(
    "/search-universities",
    {
      ...data,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(data);

  return response;
};

export const updateUniversity = async (data) => {
    // console.log("sikhaj data ",data);
    
  const response = await universityService.post(
    "/update-university",
    {
      ...data,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};
