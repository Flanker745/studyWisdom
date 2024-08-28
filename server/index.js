const express = require("express");
const app = express();
require("./db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const jwtKey = "asign_a_key";
const Coching = require("./Models/coching");
const Student = require("./Models/student");
const Tutor = require("./Models/tutor");
const Teacher = require("./Models/teacher");
const User = require("./Models/users");
const Notes = require("./Models/notes");
const Results = require("./Models/result");
const Videos = require("./Models/video");

const Dpps = require("./Models/dpp");
const Modules = require("./Models/modules");
const cors = require("cors");
const Datas = require("./email");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Ensure directories exist
const directories = [
  "/uplodes/coachings",
  "/uplodes/tutors",
  "/uplodes/notes",
  "/uplodes/modules",
  "/uplodes/dpps",
  "/uplodes/results",
];
directories.forEach((dir) => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uplodes", "coachings"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const tutorDp = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uplodes", "tutors"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const notesFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uplodes", "notes"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const modulesFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uplodes", "modules"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const dppsFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uplodes", "dpps"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const resultsFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uplodes", "results"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const tutordis = multer({ storage: tutorDp }).single("logo");
const notes_upload = multer({ storage: notesFile }).single("note_file");
const modules_upload = multer({ storage: modulesFile }).single("module_file");
const dpps_upload = multer({ storage: dppsFile }).single("dpp_file");
const results_upload = multer({ storage: resultsFile }).single("result_file");

const upload = multer({ storage: storage }).single("logo");
const fileUplodes = multer({ storage });

app.use(
  "/uplodes/coachings",
  express.static(path.join(__dirname, "uplodes", "coachings"))
);
app.use(
  "/uplodes/tutors",
  express.static(path.join(__dirname, "uplodes", "tutors"))
);
app.use(
  "/uplodes/notes",
  express.static(path.join(__dirname, "uplodes", "notes"))
);
app.use(
  "/uplodes/modules",
  express.static(path.join(__dirname, "uplodes", "modules"))
);
app.use(
  "/uplodes/dpps",
  express.static(path.join(__dirname, "uplodes", "dpps"))
);
app.use(
  "/uplodes/results",
  express.static(path.join(__dirname, "uplodes", "results"))
);
app.use(express.json());

//JWt Verify

const verifyJWT = (req, res, next) => {
  let auth = req.headers.authorization;
  if (!auth)
    return res
      .status(401)
      .json({ msg: "Please Login Properly!", status: false });
  auth = auth.split(" ")[1];
  JWT.verify(auth, jwtKey, (err, decode) => {
    if (err)
      return res
        .status(403)
        .json({ msg: "something went wrong", status: false });

    req.user = decode.user;
    next();
  });
};

// otp verify
const setOtp = new Map();
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: Datas.email,
    pass: Datas.pass,
  },
});
app.post("/getOTP", async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ msg: "User already exist", status: false });
  }

  let otp = Math.floor(1000 + Math.random() * 9000);
  setOtp.set(email, otp.toString());
  const option = {
    from: Datas.email,
    to: email,
    subject: "OTP for login",
    text: "Your OTP is " + otp,
  };
  console.log(otp);
  transporter.sendMail(option, (err, info) => {
    if (err) return res.status(202).json({ msg: err, status: false });
    res.status(200).json({ msg: info, status: true });
  });
});

//user Register
app.post("/registerUser", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    city,
    state,
    otp,
    role,
  } = req.body;
  try {
    const existingUser = await User.findOne({email : email });

    if (existingUser) {
      return res.json({ msg: "User already exist", status: false });
    }
    let realotp = setOtp.get(email);
    if (realotp !== otp) {
      return res.json({ msg: "Invalid OTP", status: false });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const response = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      address,
      city,
      state,
      role,
    });
    res.json({ msg: response, status: true });
  } catch (err) {
    res.json({ msg: err });
  }
});

// login check
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });
  if (!userData) {
    return res.json({ msg: "User not found", status: false });
  }
  const passwordverify = await bcrypt.compare(password, userData.password);
  if (!passwordverify) {
    return res.json({ msg: "Password not match", status: false });
  }
  JWT.sign(
    { userData },
    jwtKey,
    { expiresIn: 60 * 60 ** 7 * 24 },
    (err, token) => {
      if (err) {
        return res.json({ msg: "Something went wrong", status: false });
      }
      res.json({
        msg: "Login Successfull",
        status: true,
        auth: token,
        userdata: userData,
      });
    }
  );
});
// Get User Data

app.post("/userdata", async (req, res) => {
  const { id } = req.body;
  const userData = await User.findById(id);
  if (!userData) {
    return res.json({ msg: "User not found", status: false });
  }
  res.json({ msg: "User Data", status: true, userData: userData });
});

//add Coching
app.post("/addCoching", upload, async (req, res) => {
  try {
    const {
      user,
      name,
      about,
      address,
      city,
      state,
      classFrom,
      classTo,
      type,
      science,
      arts,
      commerce,
      exams,
    } = req.body;
    const logoImg = req.file.filename;
    const cochingdata = new Coching({
      user,
      name,
      about,
      address,
      city,
      state,
      classFrom,
      classTo,
      type,
      exams: exams ? exams.split(",") : [], // Split exams string into an array
      science: science ? science.split(",") : [], // Split exams string into an array
      arts: arts ? arts.split(",") : [], // Split arts string into an array
      commerce: commerce ? commerce.split(",") : [], // Split commerce string into an array
      logo: logoImg,
      status: true,
    });

    const response = await cochingdata.save();
    res.json({ msg: cochingdata, status: true, response: response });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});
app.get("/",async(req,res)=>{

  const existingUser = await User.findOne({email : "onestopshop3322@gmail.com" });
  console.log(existingUser)

  res.send("")
})
//view cochings'

app.get("/viewCochings", async (req, res) => {
  const response = await Coching.find({ status: true });
  const newResponce = response.map((v) => ({
    ...v._doc,
    logo: `${req.protocol}://${req.get("host")}/uplodes/coachings/${v.logo}`,
  }));
  res.json({ msg: "Api called", res: newResponce, status: true });
});

app.get("/viewCoching/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Coching.findById(id);
    const newResponce = {
      ...response._doc,
      logo: `${req.protocol}://${req.get("host")}/uplodes/coachings/${
        response.logo
      }`,
    };
    res.json({ msg: "Api called", res: newResponce, status: true });
  } catch (err) {
    res.json({ msg: "Api called", res: err, status: false });
  }
});

// tutors

app.post("/addtutor", tutordis, async (req, res) => {
  let requestData = {};

  // Collect all fields from the request body
  Object.keys(req.body).forEach((key) => {
    requestData[key] = req.body[key];
  });

  const logoImg = req.file.filename;
  requestData.logo = logoImg;

  requestData.exams = requestData.exams ? requestData.exams.split(",") : [];
  requestData.science = requestData.science
    ? requestData.science.split(",")
    : [];
  requestData.arts = requestData.arts ? requestData.arts.split(",") : [];
  requestData.commerce = requestData.commerce
    ? requestData.commerce.split(",")
    : [];
  try {
    const tutordata = new Tutor(requestData);
    const response = await tutordata.save();
    res.json({ msg: "Api called", response: response, status: true });
  } catch (err) {
    res.json({ msg: "Api called failed", res: err, status: false });
    console.log(err, "err"); // Log the collected data
  }

  // Respond with the collected data
});

app.get("/viewTutors", async (req, res) => {
  const response = await Tutor.find();
  const newResponce = response.map((v) => ({
    ...v._doc,
    logo: `${req.protocol}://${req.get("host")}/uplodes/tutors/${v.logo}`,
  }));
  res.json({ msg: "Api called", res: newResponce, status: true });
});

app.get("/viewTutors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Tutor.findById(id);
    const newResponce = {
      ...response._doc,
      logo: `${req.protocol}://${req.get("host")}/uplodes/tutors/${
        response.logo
      }`,
    };
    res.json({ msg: "Api called", res: newResponce, status: true });
  } catch (err) {
    res.json({ msg: "Api called", res: err, status: false });
  }
});

// taecher

app.post("/addteacher", tutordis, async (req, res) => {
  let requestData = {};

  // Collect all fields from the request body
  Object.keys(req.body).forEach((key) => {
    requestData[key] = req.body[key];
  });

  const logoImg = req.file.filename;
  requestData.logo = logoImg;

  requestData.exams = requestData.exams ? requestData.exams.split(",") : [];
  requestData.science = requestData.science
    ? requestData.science.split(",")
    : [];
  requestData.arts = requestData.arts ? requestData.arts.split(",") : [];
  requestData.commerce = requestData.commerce
    ? requestData.commerce.split(",")
    : [];
  try {
    const tutordata = new Teacher(requestData);
    const response = await tutordata.save();
    res.json({ msg: "Api called", response: response, status: true });
  } catch (err) {
    res.json({ msg: "Api called failed", res: err, status: false });
    console.log(err, "err"); // Log the collected data
  }

  // Respond with the collected data
});

app.get("/viewTeacher", async (req, res) => {
  const response = await Teacher.find();
  const newResponce = response.map((v) => ({
    ...v._doc,
    logo: `${req.protocol}://${req.get("host")}/uplodes/tutors/${v.logo}`,
  }));
  res.json({ msg: "Api called", res: newResponce, status: true });
});

app.get("/viewTeacher/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Teacher.findById(id);
    const newResponce = {
      ...response._doc,
      logo: `${req.protocol}://${req.get("host")}/uplodes/tutors/${
        response.logo
      }`,
    };
    res.json({ msg: "Api called", res: newResponce, status: true });
  } catch (err) {
    res.json({ msg: "Api called", res: err, status: false });
  }
});

// test
app.post("/test", async (req, res) => {
  const { id } = req.body;
  let result;
  result = await Coching.findOne({ user: id }).populate("user");
  if (!result) {
    result = await Student.findOne({ user_id: id }).populate("user_id");
  }
  if (!result) {
    result = await Tutor.findOne({ user: id }).populate("user");
  }
  if (!result) {
    result = await Teacher.findOne({ user: id }).populate("user");
  }

  if (result) {
    res.json({
      msg: "Api called",
      res: result,
      exitId: result._id,
      status: true,
    });
  } else {
    res.json({ msg: "Api called", res: "No record found", status: false });
  }
});

app.get("/", async (req, res) => {
  const response = await Coching.find();
  const newResponce = response.map((v) => ({
    ...v._doc,
    logo: `${req.protocol}://${req.get("host")}/uplodes/coachings/${v.logo}`,
  }));
  res.json({ msg: "Api called", res: newResponce, status: true });
});

// add students

app.post("/addstudents", verifyJWT, fileUplodes.none(), async (req, res) => {
  const {
    coaching_id,
    password,
    firstname,
    lastname,
    email,
    address,
    city,
    state,
    role,
    classes,
    streams,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(coaching_id)) {
    return res.json({ msg: "Invalid coaching ID", status: false });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ msg: "User already exists", status: false });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const response = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      address,
      city,
      state,
      role,
    });
    const user_id = response._id.toHexString();
    const responce2 = await Student.create({
      user_id,
      coaching_id,
      classes,
      streams,
    });
    res.json({ msg: "API called", status: true });
  } catch (err) {
    res.json({ msg: err.message, status: false });
  }
});

app.get("/viewstudents/:id", async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Student.countDocuments({
      coaching_id: new mongoose.Types.ObjectId(id),
    });
    const students = await Student.find({
      coaching_id: new mongoose.Types.ObjectId(id),
    })
      .populate("user_id")
      .skip(skip)
      .limit(limit);
    res.json({ students: students, total: total, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.post("/addnotes", verifyJWT, notes_upload, async (req, res) => {
  const note_file = req.file.filename;

  const { coaching_id, notes_name, classes, streams, subject } = req.body;
  try {
    const response = await Notes.create({
      coaching_id,
      notes_name,
      classes,
      streams,
      subject,
      note_file,
    });
    res.json({ msg: "API called", status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.get("/viewNotes/:id", async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Notes.countDocuments({
      coaching_id: new mongoose.Types.ObjectId(id),
    });
    let notes = await Notes.find({
      coaching_id: new mongoose.Types.ObjectId(id),
    })
      .skip(skip)
      .limit(limit);

    notes = notes.map((v) => ({
      ...v._doc,
      note_file_path: `${req.protocol}://${req.get("host")}/uplodes/notes/${
        v.note_file
      }`,
    }));
    res.json({ notes: notes, total: total, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.post("/addModules", verifyJWT, modules_upload, async (req, res) => {
  const module_file = req.file.filename;

  const { coaching_id, module_name, classes, streams, subject } = req.body;
  try {
    const response = await Modules.create({
      coaching_id,
      module_name,
      classes,
      streams,
      subject,
      module_file,
    });
    res.json({ msg: "API called", status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.get("/viewModules/:id", async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Modules.countDocuments({
      coaching_id: new mongoose.Types.ObjectId(id),
    });
    let modules = await Modules.find({
      coaching_id: new mongoose.Types.ObjectId(id),
    })
      .skip(skip)
      .limit(limit);

    modules = modules.map((v) => ({
      ...v._doc,
      module_file_path: `${req.protocol}://${req.get("host")}/uplodes/modules/${
        v.module_file
      }`,
    }));
    res.json({ modules: modules, total: total, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.post("/addDpp", verifyJWT, dpps_upload, async (req, res) => {
  const dpp_file = req.file.filename;
  const { coaching_id, dpp_name, classes, streams, subject } = req.body;
  try {
    const response = await Dpps.create({
      coaching_id,
      dpp_name,
      classes,
      streams,
      subject,
      dpp_file,
    });
    res.json({ msg: "API called", status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.get("/viewdpps/:id", async (req, res) => {
  const { id } = req.params;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Notes.countDocuments({
      coaching_id: new mongoose.Types.ObjectId(id),
    });
    let dpps = await Dpps.find({ coaching_id: new mongoose.Types.ObjectId(id) })
      .skip(skip)
      .limit(limit);

    dpps = dpps.map((v) => ({
      ...v._doc,
      dpp_file_path: `${req.protocol}://${req.get("host")}/uplodes/dpps/${
        v.dpp_file
      }`,
    }));
    res.json({ dpps: dpps, total: total, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.post("/addresults", verifyJWT, results_upload, async (req, res) => {
  const result_file = req.file.filename;

  const { coaching_id, result_name, classes, streams, subject } = req.body;
  try {
    const response = await Results.create({
      coaching_id,
      result_name,
      classes,
      streams,
      subject,
      result_file,
    });
    res.json({ msg: "API called", status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.get("/viewResults/:id", async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await Notes.countDocuments({
      coaching_id: new mongoose.Types.ObjectId(id),
    });
    let results = await Results.find({
      coaching_id: new mongoose.Types.ObjectId(id),
    })
      .skip(skip)
      .limit(limit);

    results = results.map((v) => ({
      ...v._doc,
      result_file_path: `${req.protocol}://${req.get("host")}/uplodes/results/${
        v.result_file
      }`,
    }));
    res.json({ results: results, total: total, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});


app.post("/addvideos", verifyJWT, fileUplodes.none(), async (req, res) => {

  const { coaching_id, video_name, video_link ,  classes, streams, subject } = req.body;
  try {
    const response = await Videos.create({
      coaching_id,
      video_name,
      video_link,
      classes,
      streams,
      subject,
    });
    res.json({ msg: "API called", status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.get("/viewVideos/:id", async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {

    let videos = await Videos.find({
      coaching_id: new mongoose.Types.ObjectId(id),
    })
      .skip(skip)
      .limit(limit);

    res.json({ videos: videos , status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});



app.get("/dashboard/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.countDocuments({
    coaching_id: new mongoose.Types.ObjectId(id),
  });
  const notes = await Notes.countDocuments({
    coaching_id: new mongoose.Types.ObjectId(id),
  });
  const modules = await Modules.countDocuments({
    coaching_id: new mongoose.Types.ObjectId(id),
  });
  const dpps = await Dpps.countDocuments({
    coaching_id: new mongoose.Types.ObjectId(id),
  });
  const results = await Results.countDocuments({
    coaching_id: new mongoose.Types.ObjectId(id),
  });
  const video = await Videos.countDocuments({
    coaching_id: new mongoose.Types.ObjectId(id),
  });

  res.json({ student, notes, modules, dpps, results, video ,  status: true });
});

app.post("/Notes", async (req, res) => {
  const { coaching_id, classes } = req.body;
  try {
    let notes = await Notes.find({
      coaching_id: new mongoose.Types.ObjectId(coaching_id),
      classes: classes,
      status: true,
    });
    notes = notes.map((v) => ({
      ...v._doc,
      note_file_path: `${req.protocol}://${req.get("host")}/uplodes/notes/${
        v.note_file
      }`,
    }));
    res.json({ notes: notes, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.post("/Dpp", async (req, res) => {
  const { coaching_id, classes } = req.body;
  try {
    let dpp = await Dpps.find({
      coaching_id: new mongoose.Types.ObjectId(coaching_id),
      classes: classes,
      status: true,
    });
    dpp = dpp.map((v) => ({
      ...v._doc,
      dpp_file_path: `${req.protocol}://${req.get("host")}/uplodes/dpps/${
        v.dpp_file
      }`,
    }));
    res.json({ dpp: dpp, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.post("/Modules", async (req, res) => {
  const { coaching_id, classes } = req.body;
  try {
    let module = await Modules.find({
      coaching_id: new mongoose.Types.ObjectId(coaching_id),
      classes: classes,
      status: true,
    });
    module = module.map((v) => ({
      ...v._doc,
      module_file_path: `${req.protocol}://${req.get("host")}/uplodes/modules/${
        v.module_file
      }`,
    }));
    res.json({ module: module, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});

app.post("/Results", async (req, res) => {
  const { coaching_id, classes } = req.body;
  try {
    let result = await Results.find({
      coaching_id: new mongoose.Types.ObjectId(coaching_id),
      classes: classes,
      status: true,
    });
    result = result.map((v) => ({
      ...v._doc,
      result_file_path: `${req.protocol}://${req.get("host")}/uplodes/results/${
        v.result_file
      }`,
    }));
    res.json({ result: result, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});



app.post("/Videos", async (req, res) => {
  const { coaching_id, classes } = req.body;
  try {
    let video = await Videos.find({
      coaching_id: new mongoose.Types.ObjectId(coaching_id),
      classes: classes,
      status: true,
    });
    res.json({ video: video, status: true });
  } catch (err) {
    res.json({ msg: err, status: false });
  }
});
app.post("/update-status", async (req, res) => {
  const { status, student } = req.body; // Extracting data from the request body
  let model;
  // Dynamically selecting the model based on the request
  switch (student) {
    case "Student":
      model = Student;
      break;
    // Add cases for other models if needed
    case "Dpps":
      model = Dpps;
      break;
    case "Results":
      model = Results;
      break;
    case "Modules":
      model = Modules;
      break;
    case "Notes":
      model = Notes;
      break;
    case "Videos":
    model = Videos;
    break;
    default:
      return res.status(400).json({ msg: "Invalid model", status: false });
  }

  try {
    // Assuming you're updating based on a unique identifier passed in the request body
    const { id } = req.body;

    // Updating the status of the specified record

    const response = await model.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { status: !status } }
    );
    if (response) {
      res.json({ msg: "Status updated", status: true, data: response });
    } else {
      res.status(404).json({ msg: "Record not found", status: false });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Error updating status",
      status: false,
      error: err.message,
    });
  }
});

app.post("/delet-coching-data", async (req, res) => {
  const { schema } = req.body; // Extracting data from the request body
  let model;
  // Dynamically selecting the model based on the request
  switch (schema) {
    case "Student":
      model = Student;
      break;
    // Add cases for other models if needed
    case "Dpps":
      model = Dpps;
      break;
    case "Results":
      model = Results;
      break;
    case "Modules":
      model = Modules;
      break;
    case "Notes":
      model = Notes;
      break;
    default:
      return res.status(400).json({ msg: "Invalid model", status: false });
  }

  try {
    // Assuming you're updating based on a unique identifier passed in the request body
    const { id } = req.body;

    // Updating the status of the specified record

    const response = await model.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (response) {
      res.json({ msg: "Deleted", status: true, data: response });
    } else {
      res.status(404).json({ msg: "Record not found", status: false });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Error Deleting",
      status: false,
      error: err.message,
    });
  }
});
app.post("/bookDemoClass" , async(req,res)=>{
  const {coching_id , user_id , message} = req.body
  console.log(coching_id , user_id , message  )
  res.send("")
})

// delet-coching-data
// Coching.updateMany({}, { $set: { status: true } })
//   .then(result => {
//     console.log(`Updated ${result.modifiedCount} students with status set to true.`);
//   })
//   .catch(error => {
//     console.error('Error updating student statuses:', error);
//   })

//port
app.listen(5500, () => {
  console.log("5500");
});
