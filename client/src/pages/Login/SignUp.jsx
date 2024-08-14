import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";

function SignUp() {
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const { api } = useContext(UserContext);

  const nav = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    role: "user",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First Name is required";
    if (!formData.lastname) newErrors.lastname = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 6-16 characters long and can include letters, numbers, and the following special characters: !@#$%^&*.";
    }
    if (otpSent && !formData.otp) newErrors.otp = "OTP is required";
    return newErrors;
  };

  const handleGenerateOtp = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setOtpSent(true);
      let responce = await fetch(`${api}/getOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      responce = await responce.json();

      if (responce.status) {
        setErrors(newErrors);
        setOtpSent(true);
      } else {
        newErrors.email = "Email is Already Taken";
        setErrors(newErrors);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        let responce = await fetch(`${api}/registerUser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        responce = await responce.json();
        if (responce.status) {
          nav("/login");
        } else {
          newErrors.otp = responce.msg;
          setErrors(newErrors);
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
      <div className="max-w-2xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Sign Up in Study buddy
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700" htmlFor="firstname">
              Name
            </label>
            <div className="flex  flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={`w-full p-2 border focus:outline-none ${
                    errors.firstname ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{errors.firstname}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={`w-full p-2 border focus:outline-none ${
                    errors.lastname ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{errors.lastname}</p>
                )}
              </div>
            </div>
          </div>
          {/* Email Address */}
          <div>
            <label className="block text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700" htmlFor="address1">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-2 border focus:outline-none ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
            <div className="flex flex-col mt-8 md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className={`w-full p-2 border focus:outline-none ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
              <input
                id="state"
                name="state"
                type="text"
                placeholder="State / Province"
                value={formData.state}
                onChange={handleChange}
                className={`w-full p-2 border focus:outline-none ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none border-gray-300"
              name="role"
              id=""
            >
              <option value="user">User</option>
              <option value="coching">Coching Institute</option>
              <option value="tutor">Tutor</option>
              <option value="teacher">Teacher</option>
            </select>
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
              className={`w-full p-2 border focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              className={`w-full p-2 border focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          {/* Submit Button */}
          <div className="mb-4">
            {!otpSent && (
              <button
                type="button"
                onClick={handleGenerateOtp}
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Generate OTP
              </button>
            )}

            {otpSent && (
              <div className="mt-4">
                <label className="block text-gray-700">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className={`w-full p-2 border focus:outline-none ${
                    errors.otp ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm">{errors.otp}</p>
                )}
              </div>
            )}
          </div>
          <div className="mb-4">
            {otpSent && (
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded"
              >
                Register
              </button>
            )}
          </div>
        </form>
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
