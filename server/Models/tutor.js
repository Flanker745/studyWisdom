const mongoose = require("mongoose");

// Define the coaching schema
const tutorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      required: true, // Coching Name
    },
    logo: {
      type: String,
      required: true, // Logo URL or Path
    },
    about: {
      type: String,
      required: true, // About Us
    },
    fee: {
      type: String,
    },
    feeAs: {
      type: String,
    },
    language: {
      type: String,
    },
    regionalLanguage: {
      type: String,
    },
    area: {
      type: String,
    },
    skills: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    classFrom: {
      type: String,
    },
    classTo: {
      type: String,
    },
    type: {
      type: String,
      required: true, // Type (Home Tuition or Coaching Classes)
    },
    science: {
      type: [String], // List of Exams (JEE, NEET, NDA, Airforce)
      default: [], // Default to an empty array
    },
    arts: {
      type: [String], // List of Exams (JEE, NEET, NDA, Airforce)
      default: [], // Default to an empty array
    },
    commerce: {
      type: [String], // List of Exams (JEE, NEET, NDA, Airforce)
      default: [], // Default to an empty array
    },
    exams: {
      type: [String], // List of Exams (JEE, NEET, NDA, Airforce)
      default: [], // Default to an empty array
    },
    status: {
      type: Boolean, // Changed from String to Boolean
      default: true, // You can set a default value if needed
    }
  },
  { timestamps: true }
);

// Create and export the model
const tutor = mongoose.model("tutors", tutorSchema);
module.exports = tutor;
