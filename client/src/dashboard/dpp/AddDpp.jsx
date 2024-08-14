import React, { useState, useContext } from "react";
import { UserContext } from "../../components/UserContext";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

function AddDpp() {
  const nav = useNavigate();
  const token = decodeURIComponent(cookie.load("token"));
  const { exitUserId, api } = useContext(UserContext);
  const [checkStreams, setCheckStreams] = useState(false);
  const [formData, setFormData] = useState({
    coaching_id: "",
    dpp_name: "",
    dpp_file: null,
    classes: "",
    streams: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "dpp_file") {
      setFormData({
        ...formData,
        dpp_file: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.dpp_name) newErrors.dpp_name = "Dpp Name is required";
    if (!formData.dpp_file) {
      newErrors.dpp_file = "Dpp file is required";
    } else {
      const file = formData.dpp_file;
      if (file.type !== "application/pdf") {
        newErrors.dpp_file = "Only PDF files are allowed";
      }
      if (file.size > 5 * 1024 * 1024) {
        newErrors.dpp_file = "File size should be less than 5 MB";
      }
    }
    if (!formData.classes) newErrors.classes = "Class is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (checkStreams && !formData.streams)
      newErrors.streams = "Streams is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      const form = e.target;
      const formDataObj = new FormData(form);

      try {
        let response = await fetch(`${api}/addDpp`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataObj,
        });
        response = await response.json();
        if (response.status) {
          nav("/dashboard/viewDpp");
        } else {
          setErrors({ submit: response.msg });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Add Dpp</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="coaching_id"
          value={exitUserId ? exitUserId : ""}
        />
        {/* Dpp Name */}
        <div>
          <label className="block text-gray-700" htmlFor="dpp_name">
            Dpp Name
          </label>
          <input
            id="dpp_name"
            name="dpp_name"
            type="text"
            placeholder="Dpp Name"
            value={formData.dpp_name}
            onChange={handleChange}
            className={`w-full p-2 border focus:outline-none ${
              errors.dpp_name ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.dpp_name && (
            <p className="text-red-500 text-sm">{errors.dpp_name}</p>
          )}
        </div>
        {/* Dpp File */}
        <div>
          <label className="block text-gray-700" htmlFor="dpp_file">
            Dpp File
          </label>
          <input
            id="dpp_file"
            name="dpp_file"
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            className={`w-full p-2 border focus:outline-none ${
              errors.dpp_file ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.dpp_file && (
            <p className="text-red-500 text-sm">{errors.dpp_file}</p>
          )}
        </div>
        {/* Class */}
        <div>
          <label className="block text-gray-700" htmlFor="classes">
            Class
          </label>
          <select
            id="classes"
            name="classes"
            value={formData.classes}
            onChange={(e) => {
              setFormData({ ...formData, classes: e.target.value });
              ["11", "12"].includes(e.target.value)
                ? setCheckStreams(true)
                : setCheckStreams(false);
            }}
            className="w-full focus:outline-none p-2 border rounded bg-neutral-50 mt-2"
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
        {/* Streams */}
        {checkStreams && (
          <div>
            <label className="block text-gray-700" htmlFor="streams">
              Streams
            </label>
            <select
              id="streams"
              name="streams"
              value={formData.streams}
              onChange={handleChange}
              className="w-full p-2 border focus:outline-none rounded bg-neutral-50 mt-2"
            >
              <option value="">Streams</option>
              {["Science", "Arts", "Commerce"].map((stream) => (
                <option key={stream} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
            {errors.streams && (
              <p className="text-red-500 text-sm">{errors.streams}</p>
            )}
          </div>
        )}
        {/* Subject */}
        <div>
          <label className="block text-gray-700" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full p-2 border focus:outline-none ${
              errors.subject ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject}</p>
          )}
        </div>
        {/* Submit Button */}
        <div className="mb-4 flex justify-end">
          <button
            type="submit"
            className="px-3 bg-green-500 text-lg text-white font-semibold py-2 rounded"
          >
            Add Dpp
          </button>
        </div>
      </form>
      {errors.submit && (
        <p className="text-red-500 text-center text-sm mt-4">{errors.submit}</p>
      )}
    </div>
  );
}

export default AddDpp;
