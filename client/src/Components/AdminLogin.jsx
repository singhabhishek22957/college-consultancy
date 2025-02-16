import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../Service/AdminService.jsx";
import { useUser } from "./Context/AdminContext.jsx"; 

const AdminLogin = () => {
  // to error define
  const [error, setError] = useState("");
  const {fetchUser} = useUser();
  

  // login button disabled  when all fields are empty
  const [isdisabled, setIsdisabled] = useState(false);

  // button set text when loading
  const [loading, setLoading] = useState(false);

  // navigate to another page when login successfully done
  const navigate = useNavigate();

  // set login data
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  // handle input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // validations
  useEffect(() => {
    const { identifier, password } = data;
    if (identifier && password) {
      setIsdisabled(false);
      setError("");
    } else {
      setIsdisabled(true);
      setError("All fields are required");
    }
  }, [data]);

  // handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { identifier, password } = data;

    // Verify email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    // data to login
    const logData = isEmail
      ? { email: identifier, password }
      : { username: identifier, password };

    try {
      // sending response
      setLoading(true);
      const response = await adminLogin(logData);
      //   console.log(response);
      setLoading(false);

      alert(`Login successful with ${response.data.data.user.username}`);
      await fetchUser();
      
      navigate("/admin");
      // window.location.reload();
    } catch (error) {
      console.log("Error to login: ", error.response.data.data.message);
      alert(`${error.response.data.data.message || "Something went wrong"}`);
      setLoading(false);
      setData({
        identifier: "",
        password: "",
      });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center ">
        {/* heading of login page  */}
        <h1 className=" text-3xl capitalize text-blue-700  font-bold m-4">
          {" "}
          Admin Login
        </h1>

        {/* form to collect login data  */}
        <form action="" className=" flex flex-col gap-4">
          {/* email or username */}
          <div className=" block ">
            <label htmlFor="emailUsername" className=" text-xl text-gray-600 ">
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              id="emailUsername"
              value={data.identifier}
              onChange={handleChange}
              required
              className="border border-gray-600 w-full p-2 text-gray-900 rounded-lg mt-1 outline-none focus:border-blue-600 text-xl focus:text-blue-900"
            />
          </div>

          {/* collecting  password */}
          <div className=" block ">
            <label htmlFor="password" className=" text-xl text-gray-600 ">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              className=" border border-gray-600 w-full p-2 text-gray-900 rounded-lg mt-1 outline-none focus:border-blue-600 text-xl  focus:text-blue-900 "
            />
          </div>
          <div className={` ${error ? "p-2" : ""}`}>
            <p
              className={` ${error ? "block" : "hidden"} text-lg text-red-700`}
            >
              {error}
            </p>
          </div>

          {/*  submit button  */}
          <div className=" text-center ">
            <input
              type="submit"
              value={loading ? "Loading..." : "Login"}
              onClick={handleSubmit}
              disabled={isdisabled}
              className={`${
                isdisabled
                  ? " bg-gray-500 text-white"
                  : "bg-blue-600 text-white"
              } border border-gray-600 w-full p-2 text-gray-900 rounded-lg mt-1 outline-none focus:border-blue-600 text-xl focus:text-blue-900`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
