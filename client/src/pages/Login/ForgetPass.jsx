import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { UserContext } from "../../components/UserContext";

function ForgetPassword() {
  const { api } = useContext(UserContext);
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpSendBtn, setOtpSentBtn] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.otp && otpSent) newErrors.otp = "OTP is required";
    if (!formData.newPassword && passwordChanged)
      newErrors.newPassword = "New password is required";
    if (!formData.confirmPassword && passwordChanged)
      newErrors.confirmPassword = "Confirm password is required";
    if (formData.newPassword && !passwordRegex.test(formData.newPassword))
      newErrors.newPassword =
        "Password must be between 6 and 16 characters and contain at least one letter, one number, and one special character";
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        if (!otpSent) {
          // Check if email exists
          setOtpSentBtn(false)
          let response = await fetch(`${api}/checkEmail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
          });
          response = await response.json();
          if (!response.exists) {
            setEmailError("Invalid email");
            setOtpSentBtn(true)
          } else {
            setOtpSentBtn(true)
            setOTP(response.otp.toString()); // Set OTP as a string
            setOtpSent(true);
          }
        } else if (otpSent && !passwordChanged) {
          // Verify OTP
          if (formData.otp !== otp) {
            setOtpError("Invalid OTP");
            console.log(false);
          } else {
            setPasswordChanged(true);
          }
        } else if (passwordChanged) {
          // Change password
          let response = await fetch(`${api}/changePassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              newPassword: formData.newPassword,
            }),
          });
          response = await response.json();
          if (response.success) {
            navigate("/login");
          } else {
            setPasswordError("Failed to change password");
          }
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
        <h1 className="text-2xl text-center font-semibold mb-6">
          Forget Password
        </h1>
        {emailError && (
          <p className="text-red-500 text-center mb-4">{emailError}</p>
        )}
        {otpError && (
          <p className="text-red-500 text-center mb-4">{otpError}</p>
        )}
        {passwordError && (
          <p className="text-red-500 text-center mb-4">{passwordError}</p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Address */}
          {!otpSent && (
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
          )}
          {/* OTP */}
          {otpSent && !passwordChanged && (
            <div>
              <label className="block text-gray-700" htmlFor="otp">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="otp"
                value={formData.otp}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp}</p>
              )}
            </div>
          )}
          {/* New Password */}
          {passwordChanged && (
            <div>
              <label className="block text-gray-700" htmlFor="newPassword">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword}</p>
              )}
            </div>
          )}
          {/* Confirm Password */}
          {passwordChanged && (
            <div>
              <label className="block text-gray-700" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          )}
          {/* Submit Button */}
          <div>
            {otpSendBtn && (
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded"
              >
                {otpSent
                  ? passwordChanged
                    ? "Change Password"
                    : "Verify OTP"
                  : "Send OTP"}
              </button>
            )}
          </div>
        </form>
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

export default ForgetPassword;
