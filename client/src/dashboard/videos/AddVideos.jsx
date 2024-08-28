import React, { useState, useContext } from "react";
import { UserContext } from "../../components/UserContext";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

function AddVideos() {
  const nav = useNavigate();
  const token = decodeURIComponent(cookie.load("token"));
  const { exitUserId, api } = useContext(UserContext);
  const [checkStreams, setCheckStreams] = useState(false);
  const [formData, setFormData] = useState({
    coaching_id: "",
    video_name: "",
    video_link: "",
    classes: "",
    streams: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
      setFormData({
        ...formData,
        [name]: value,
      });
    setErrors({});
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.video_name)
      newErrors.video_name = "Video Name is required";
    if (!formData.video_link) {
      newErrors.video_link = "Video link is required";
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
        let response = await fetch(`${api}/addvideos`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataObj,
        });
        response = await response.json();
        if (response.status) {
          nav("/dashboard/viewVideos");
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
      <h1 className="text-2xl font-semibold text-center mb-6">Add Video</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="coaching_id"
          value={exitUserId ? exitUserId : ""}
        />
        {/* Video Name */}
        <div>
          <label className="block text-gray-700" htmlFor="video_name">
            Video Name
          </label>
          <input
            id="video_name"
            name="video_name"
            type="text"
            placeholder="Video Name"
            value={formData.video_name}
            onChange={handleChange}
            className={`w-full p-2 border focus:outline-none ${
              errors.video_name ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.video_name && (
            <p className="text-red-500 text-sm">{errors.video_name}</p>
          )}
        </div>
        {/* Video File */}
        <div>
          <label className="block text-gray-700" htmlFor="video_link">
            Video Link
          </label>
          <input
            id="video_link"
            name="video_link"
            type="text"
            placeholder="Video Link"
            value={formData.video_link}
            onChange={handleChange}
            className={`w-full p-2 border focus:outline-none ${
              errors.video_link ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.video_link && (
            <p className="text-red-500 text-sm">{errors.video_link}</p>
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
            Add Video
          </button>
        </div>
      </form>
      {errors.submit && (
        <p className="text-red-500 text-center text-sm mt-4">{errors.submit}</p>
      )}
    </div>
  );
}

export default AddVideos;
