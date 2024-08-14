import React, { useContext, useState } from "react";
import { UserContext } from "../../components/UserContext";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";

function AddStudents() {
  const nav = useNavigate();

  const token = decodeURIComponent(cookie.load("token"));
  const { exitUserId, api } = useContext(UserContext);
  const [checkStreams, setcheckStreams] = useState(false);
  const [formData, setFormData] = useState({
    coaching_id: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    role: "student",
    classes: "",
    streams: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First Name is required";
    if (!formData.lastname) newErrors.lastname = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.classes) newErrors.classes = "Class is required";

    if (checkStreams) {
      if (!formData.streams) newErrors.streams = "streams is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      const form = e.target;
      const formd = new FormData(form);

      try {
        let response = await fetch(`${api}/addstudents`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formd,
        });
        response = await response.json();
        if (response.status) {
          nav("/dashboard/viewStudent");
        } else {
          newErrors.email = response.msg;
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
          Add Students
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="role" value={formData.role} />
          <input type="hidden" name="password" value={"password"} />
          <input
            type="hidden"
            name="coaching_id"
            value={exitUserId ? exitUserId : ""}
          />
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
              <div>
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
              </div>
              <div>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State / Province"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full p-2 border  focus:outline-none ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
            </div>
          </div>
          {/*class*/}
          <div className="w-full">
            <div>
              <label className="block text-gray-700" htmlFor="address1">
                Class
              </label>
              <select
                className="w-full  border rounded bg-neutral-50 mt-2 p-2 text-base md:text-lg focus:outline-none"
                name="classes"
                value={formData.classes}
                onChange={(e) => {
                  setFormData({ ...formData, classes: e.target.value });
                  ["11", "12"].includes(e.target.value)
                    ? setcheckStreams(true)
                    : setcheckStreams(false);
                }}
              >
                <option value="">Class</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {errors.classes && (
                <p className="text-red-500 text-sm">{errors.classes}</p>
              )}
            </div>
            {checkStreams && (
              <div className="mt-2">
                <label className="block text-gray-700" htmlFor="address1">
                  Streams
                </label>
                <select
                  className="w-full  border rounded bg-neutral-50 mt-2 p-2 text-base md:text-lg focus:outline-none"
                  name="streams"
                  value={formData.streams}
                  onChange={(e) => {
                    setFormData({ ...formData, streams: e.target.value });
                  }}
                >
                  <option value="">Streams</option>
                  {["Sciencs", "Arts", "Commerce"].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                {errors.streams && (
                  <p className="text-red-500 text-sm">{errors.streams}</p>
                )}
              </div>
            )}
          </div>
          {/* Submit Button */}
          <div className="mb-4 flex justify-end">
            <button
              type="submit"
              className=" px-3 bg-green-500 text-lg text-white font-semibold py-2 rounded"
            >
              Add student
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddStudents;
