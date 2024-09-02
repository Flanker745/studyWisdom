import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import { Country, State, City } from "country-state-city";

function AddTutor() {
  const { id, user, existUser, setExistUser, exitUserId, api } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [stateApi, setStateApi] = useState(State.getStatesOfCountry("IN"));
  const [cityApi, setCityApi] = useState([]);
  useEffect(() => {
    if (id !== "undefined") {
      checkCredentials();
    } else {
      navigate("/login");
    }
  }, [user]);

  function checkCredentials() {
    if (user) {
      if (user.role !== "tutor") {
        navigate("/");
      }
    }
  }
  if (existUser) {
    window.location.href = `tutor/${exitUserId}`;
  }

  const [logo, setLogo] = useState();
  const [classType, setClassType] = useState("");
  const [classArea, setClassArea] = useState("");
  const [classLanguage, setClassLanguage] = useState("");
  const [formdata, setFormdata] = useState({
    user: "",
    name: "",
    logo: "",
    about: "",
    fee: "",
    feeAs: "perhour",
    language: "",
    regionalLanguage: "",
    area: "",
    skills: "",
    address: "",
    city: "",
    state: "",
    classFrom: "",
    classTo: "",
    science: [],
    arts: [],
    commerce: [],
    type: "",
    exams: [],
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formdata.name) newErrors.name = "Name is required.";
    if (!formdata.logo) newErrors.logo = "Logo is required.";
    if (!formdata.type) newErrors.type = "Type is required.";
    if (!formdata.about) newErrors.about = "About us is required.";
    if (!formdata.fee) newErrors.fee = "Fee  is required.";
    if (!formdata.language) newErrors.language = "Language is required.";
    if (!formdata.area) newErrors.area = "Area is required.";
    if (classLanguage == "regional") {
      if (!formdata.regionalLanguage)
        newErrors.regionalLanguage = "Regional Language is required.";
    }
    if (classType == "offline") {
      if (!formdata.address) newErrors.address = "Address is required.";
      if (!formdata.city) newErrors.city = "City is required.";
      if (!formdata.state) newErrors.state = "State is required.";
    }

    if (classArea == "education") {
      if (!formdata.classFrom) newErrors.classFrom = "Class from is required.";
      if (!formdata.classTo) newErrors.classTo = "Class to is required.";
    }

    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const form = e.target;
    const formData = new FormData(form);
    // Manually append exams array to FormData
    if (classArea == "education") {
      formData.append("exams", formdata.exams.join(","));
      formData.append("science", formdata.science.join(","));
      formData.append("arts", formdata.arts.join(","));
      formData.append("commerce", formdata.commerce.join(","));
    }
    try {
      let response = await fetch(`${api}/addtutor`, {
        method: "POST",

        body: formData,
      });
      response = await response.json();
      if (response) {
        form.reset();
        setExistUser(true);
        navigate(`/tutor/${response.response._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogoChange = (e) => {
    let file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      alert("Please upload a valid image file (jpg, jpeg, png).");
      e.target.value = ""; // Reset the file input
      return;
    }
    let abc = window.URL.createObjectURL(file);
    setLogo(abc);
    setFormdata({ ...formdata, logo: file });
  };

  const handleCheckboxExam = (e) => {
    const { value, checked } = e.target;
    let updatedExams = [...formdata.exams];
    if (checked) {
      updatedExams.push(value);
    } else {
      updatedExams = updatedExams.filter((exam) => exam !== value);
    }
    setFormdata({ ...formdata, exams: updatedExams });
  };
  const handleCheckboxScience = (e) => {
    const { value, checked } = e.target;
    let updatedExams = [...formdata.science];
    if (checked) {
      updatedExams.push(value);
    } else {
      updatedExams = updatedExams.filter((exam) => exam !== value);
    }
    setFormdata({ ...formdata, science: updatedExams });
  };
  const handleCheckboxArts = (e) => {
    const { value, checked } = e.target;
    let updatedExams = [...formdata.arts];
    if (checked) {
      updatedExams.push(value);
    } else {
      updatedExams = updatedExams.filter((exam) => exam !== value);
    }
    setFormdata({ ...formdata, arts: updatedExams });
  };
  const handleCheckboxCommerce = (e) => {
    const { value, checked } = e.target;
    let updatedExams = [...formdata.commerce];
    if (checked) {
      updatedExams.push(value);
    } else {
      updatedExams = updatedExams.filter((exam) => exam !== value);
    }
    setFormdata({ ...formdata, commerce: updatedExams });
  };

  const handleStateChange = (e) => {
    const selectedState = stateApi.find(
      (state) => state.isoCode === e.target.value
    );
    setFormdata({
      ...formdata,
      state: selectedState.name,
      city: "", // reset city when state changes
    });
    setCityApi(City.getCitiesOfState("IN", selectedState.isoCode));
  };

  const handleCityChange = (e) => {
    setFormdata({
      ...formdata,
      city: e.target.value,
    });
  };

  return (
    <>
      <div className="m-auto w-full lg:w-3/4 border-2 my-6 p-6 rounded-lg">
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <input type="hidden" name="user" value={id} />
          <h5 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">
            Add Tutor
          </h5>
          <div>
            <input
              type="text"
              className="w-full border rounded bg-neutral-50 py-2 px-3 text-base md:text-lg focus:outline-none"
              placeholder="Name"
              name="name"
              value={formdata.name}
              onChange={(e) => {
                setFormdata({ ...formdata, name: e.target.value });
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row border rounded bg-neutral-50 py-2 px-3 gap-4">
            <input
              onChange={handleLogoChange}
              className="w-full"
              type="file"
              name="logo"
            />
            <div className="w-full md:w-[250px] h-[200px] rounded-lg overflow-hidden border">
              <img className="w-full h-full object-cover" src={logo} alt="" />
            </div>
          </div>
          {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
          <div className="space-y-5">
            <div>
              <input
                type="text"
                className="w-full border rounded bg-neutral-50 py-2 px-3 text-base md:text-lg focus:outline-none"
                placeholder="About You"
                name="about"
                value={formdata.about}
                onChange={(e) => {
                  setFormdata({ ...formdata, about: e.target.value });
                }}
              />
              {errors.about && (
                <p className="text-red-500 text-sm">{errors.about}</p>
              )}
            </div>
            <div className="flex justify-start items-center gap-9 felx-wrap">
              <div>
                <input
                  type="text"
                  className="w-full border rounded bg-neutral-50 py-2 px-3 text-base md:text-lg focus:outline-none"
                  placeholder="Fee"
                  name="fee"
                  value={formdata.fee}
                  onChange={(e) => {
                    setFormdata({ ...formdata, fee: e.target.value });
                  }}
                />
                {errors.fee && (
                  <p className="text-red-500 text-sm">{errors.fee}</p>
                )}
              </div>
              <div className="">
                <select
                  name="feeAs"
                  className="border rounded bg-neutral-50  p-2 text-base md:text-lg focus:outline-none"
                  value={formdata.feeAs}
                  onChange={(e) => {
                    setFormdata({ ...formdata, feeAs: e.target.value });
                  }}
                >
                  <option value="perhour">per Hour</option>
                  <option value="perMonth">per Month</option>
                </select>
              </div>
            </div>
            <h4 className="text-2xl">Language</h4>
            <div className="flex px-2 mt-3 gap-8">
              <div>
                <label htmlFor="hindi">Hindi</label>
                <input
                  value={formdata.language}
                  onChange={() => {
                    setClassLanguage("hindi");
                    setFormdata({ ...formdata, language: "hindi" });
                  }}
                  id="hindi"
                  className="ms-3"
                  name="language"
                  type="radio"
                />
              </div>
              <div>
                <label htmlFor="english">English</label>
                <input
                  value={formdata.language}
                  onChange={() => {
                    setClassLanguage("english");
                    setFormdata({ ...formdata, language: "english" });
                  }}
                  id="english"
                  className="ms-3"
                  name="language"
                  type="radio"
                />
              </div>
              <div>
                <label htmlFor="regional">Regional</label>
                <input
                  value={formdata.language}
                  onChange={() => {
                    setClassLanguage("regional");
                    setFormdata({ ...formdata, language: "regional" });
                  }}
                  id="regional"
                  className="ms-3"
                  name="language"
                  type="radio"
                />
              </div>
              {errors.language && (
                <p className="text-red-500 text-sm">{errors.language}</p>
              )}
            </div>
            {classLanguage === "regional" && (
              <div>
                <input
                  type="text"
                  className="w-full border rounded bg-neutral-50 py-2 px-3 text-base md:text-lg focus:outline-none"
                  placeholder="Other language"
                  name="regionalLanguage"
                  value={formdata.regionalLanguage}
                  onChange={(e) => {
                    setFormdata({
                      ...formdata,
                      regionalLanguage: e.target.value,
                    });
                  }}
                />
                {errors.regionalLanguage && (
                  <p className="text-red-500 text-sm">
                    {errors.regionalLanguage}
                  </p>
                )}
              </div>
            )}
            <h4 className="text-2xl">Type</h4>
            <div className="flex px-2 mt-3 gap-8">
              <div>
                <label htmlFor="online">Online</label>
                <input
                  value={formdata.type}
                  onChange={() => {
                    setClassType("online");
                    setFormdata({
                      ...formdata,
                      type: "online",
                    });
                  }}
                  id="online"
                  className="ms-3"
                  name="type"
                  type="radio"
                />
              </div>
              <div>
                <label htmlFor="Offline">Offline</label>
                <input
                  value={formdata.type}
                  onChange={() => {
                    setClassType("offline");
                    setFormdata({
                      ...formdata,
                      type: "offline",
                    });
                  }}
                  id="Offline"
                  className="ms-3"
                  name="type"
                  type="radio"
                />
              </div>
              <div>
                <label htmlFor="both">Online & Offline</label>
                <input
                  value={formdata.type}
                  onChange={() => {
                    setClassType("offline");
                    setFormdata({
                      ...formdata,
                      type: "online && Offline",
                    });
                  }}
                  id="both"
                  className="ms-3"
                  name="type"
                  type="radio"
                />
              </div>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type}</p>
              )}
            </div>
          </div>

          {classType == "offline" ? (
            <div className="space-y-5">
              <div>
                <input
                  type="text"
                  className="w-full border rounded bg-neutral-50 py-2 px-3 text-base md:text-lg focus:outline-none"
                  placeholder="Address"
                  name="address"
                  value={formdata.address}
                  onChange={(e) => {
                    setFormdata({ ...formdata, address: e.target.value });
                  }}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>
              <div className="flex flex-col mt-8 md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="w-full">
                  <select
                    id="state"
                    name="state"
                    placeholder="State / Province"
                    onChange={handleStateChange}
                    className={`w-full p-2 border focus:outline-none ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    } rounded`}
                  >
                    <option value="">State</option>
                    {stateApi.map((v, key) => (
                      <option key={key} value={v.isoCode}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>
                <div className="w-full">
                  <select
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formdata.city}
                    onChange={handleCityChange}
                    className={`w-full p-2 border focus:outline-none ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } rounded`}
                  >
                    <option value="">City</option>
                    {cityApi.map((v, key) => (
                      <option key={key} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div>
            <h4 className="text-2xl mt-5">Area</h4>
            <div className="flex px-2 mt-3 gap-8">
              <div>
                <label htmlFor="education">Education</label>
                <input
                  value={formdata.area}
                  onChange={() => {
                    setClassArea("education");
                    setFormdata({
                      ...formdata,
                      area: "education",
                    });
                  }}
                  id="education"
                  className="ms-3"
                  name="area"
                  type="radio"
                />
              </div>
              <div>
                <label htmlFor="skills">Skills</label>
                <input
                  value={formdata.area}
                  onChange={() => {
                    setClassArea("skills");
                    setFormdata({
                      ...formdata,
                      area: "skills",
                    });
                  }}
                  id="skills"
                  className="ms-3"
                  name="area"
                  type="radio"
                />
              </div>
              {errors.area && (
                <p className="text-red-500 text-sm">{errors.area}</p>
              )}
            </div>
          </div>
          {classArea == "education" && (
            <>
              <div>
                <div className="flex flex-col md:flex-row gap-4">
                  <select
                    className="w-full md:w-[15%] border rounded bg-neutral-50 mt-2 p-2 text-base md:text-lg focus:outline-none"
                    name="classFrom"
                    value={formdata.classFrom}
                    onChange={(e) => {
                      setFormdata({ ...formdata, classFrom: e.target.value });
                    }}
                  >
                    <option value="">Class From</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  {errors.classFrom && (
                    <p className="text-red-500 text-sm">{errors.classFrom}</p>
                  )}
                  <select
                    className="w-full md:w-[15%] border rounded bg-neutral-50 mt-2 p-2 text-base md:text-lg focus:outline-none"
                    name="classTo"
                    value={formdata.classTo}
                    onChange={(e) => {
                      setFormdata({ ...formdata, classTo: e.target.value });
                    }}
                  >
                    <option value="">Class To</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  {errors.classTo && (
                    <p className="text-red-500 text-sm">{errors.classTo}</p>
                  )}
                </div>
                <div></div>
              </div>
              <div className="space-y-2">
                <label className="block text-xl md:text-2xl font-semibold">
                  Class 11th , 12th
                </label>
                <div>
                  <label className="block mt-5 text-xl md:text-2xl ps-3 font-semibold">
                    Science
                  </label>
                  <div className="flex flex-wrap flex-col md:flex-row gap-4 pt-3">
                    {["Physics", "Chenistry", "Maths", "Biology"].map(
                      (exam) => (
                        <div
                          key={exam}
                          className="flex items-center space-x-2 text-base md:text-xl"
                        >
                          <input
                            id={exam}
                            type="checkbox"
                            value={exam}
                            onChange={handleCheckboxScience}
                          />
                          <label htmlFor={exam}>{exam.toUpperCase()}</label>
                        </div>
                      )
                    )}
                  </div>
                  <div>
                    <label className="block mt-5 text-xl md:text-2xl ps-3 font-semibold">
                      Arts
                    </label>
                    <div className="flex flex-wrap flex-col md:flex-row gap-4 pt-3">
                      {[
                        "Economics",
                        "History",
                        "Political Science",
                        "Geography",
                        "Sociology",
                        "Philosophy",
                        "Psychology",
                        "Computer Science",
                      ].map((exam) => (
                        <div
                          key={exam}
                          className="flex items-center space-x-2 text-base md:text-xl"
                        >
                          <input
                            id={exam}
                            type="checkbox"
                            value={exam}
                            onChange={handleCheckboxArts}
                          />
                          <label htmlFor={exam}>{exam.toUpperCase()}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block mt-5 text-xl md:text-2xl ps-3 font-semibold">
                      Commerce
                    </label>
                    <div className="flex flex-wrap flex-col md:flex-row gap-4 pt-3">
                      {["Accountancy", " Business Studies", " Economics"].map(
                        (exam) => (
                          <div
                            key={exam}
                            className="flex items-center space-x-2 text-base md:text-xl"
                          >
                            <input
                              id={exam}
                              type="checkbox"
                              value={exam}
                              onChange={handleCheckboxCommerce}
                            />
                            <label htmlFor={exam}>{exam.toUpperCase()}</label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div>
                <label className="block text-xl md:text-2xl font-semibold">
                  Exam
                </label>
                <div className="flex flex-col md:flex-row gap-4 pt-3">
                  {["jee", "neet", "nda", "airforce"].map((exam) => (
                    <div
                      key={exam}
                      className="flex items-center space-x-2 text-base md:text-xl"
                    >
                      <input
                        id={exam}
                        type="checkbox"
                        value={exam}
                        onChange={handleCheckboxExam}
                      />
                      <label htmlFor={exam}>{exam.toUpperCase()}</label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {classArea == "skills" && (
            <div>
              <input
                type="text"
                className="w-full border rounded bg-neutral-50 py-2 px-3 text-base md:text-lg focus:outline-none"
                placeholder="skills"
                name="skills"
                value={formdata.skills}
                onChange={(e) => {
                  setFormdata({ ...formdata, skills: e.target.value });
                }}
              />
              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills}</p>
              )}
            </div>
          )}
          <div className="text-end">
            <button className="px-6 py-2 text-lg md:text-2xl rounded-lg font-semibold bg-blue-500 text-white">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTutor;
