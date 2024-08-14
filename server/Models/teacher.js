const mongoose = require("mongoose");

// Define the coaching schema
const teacherSchema = new mongoose.Schema(
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
    language: {
      type: String,
    },
    regionalLanguage: {
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
    subject:{
        type: String,
        required: true, 
    },
    type: {
      type: String,
      required: true, // Type (Home Tuition or Coaching Classes)
    },
    status: {
      type: Boolean, // Changed from String to Boolean
      default: true, // You can set a default value if needed
    }
    
  },
  { timestamps: true }
);

// Create and export the model
const teacher = mongoose.model("teachers", teacherSchema);
module.exports = teacher;
