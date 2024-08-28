import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { UserContext } from "../../components/UserContext";

function Login() {
  const { api, setUser, setExistUser, setExitUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        let response = await fetch(`${api}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        response = await response.json();
        if (response.status) {
          cookie.save("token", response.auth);
          cookie.save("id", encodeURIComponent(response.userdata._id));
          let exitUserId = await fetch(`${api}/test`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: response.userdata._id }),
          });

          exitUserId = await exitUserId.json();
          setExistUser(exitUserId?.status);
          if (exitUserId.status) {
            setExitUserId(exitUserId?.exitId);
          }
          // Log user data before setting it
          setUser(response?.userdata); // Update the user context
          navigate("/");
        } else {
          setLoginError(response.msg);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4">
        <h1 className="text-2xl text-center font-semibold mb-6">Login</h1>
        {loginError && (
          <p className="text-red-500 text-center mb-4">{loginError}</p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Address */}
          <div>
            <label className="block text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-6 ">
          <Link to="/forgetPass" className="text-blue-600">
            Forget Passowrd !
          </Link>
        </p>
        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
