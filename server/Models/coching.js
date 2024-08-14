const mongoose = require("mongoose");

// Define the coaching schema
const cochingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
    },
    logo: {
      type: String,
      required: true, // Logo URL or Path
    },
    about: {
      type: String,
      required: true, // About Us
    },
    address: {
      type: String,
      required: true, // Address
    },
    city: {
      type: String,
      required: true, // City
    },
    state: {
      type: String,
      required: true, // State
    },
    classFrom: {
      type: String,
      required: true, // Class From
    },
    classTo: {
      type: String,
      required: true, // Class To
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
const Coching = mongoose.model("Cochings", cochingSchema);
module.exports = Coching;
