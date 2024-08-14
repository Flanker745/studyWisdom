const mongoose = require("mongoose");

// Define the coaching schema
const modulesSchema = new mongoose.Schema(
  {
    coaching_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cochings",
      required: true,
    },
    module_name: {
        type: String,
        required: true,
      },
    module_file: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      required: true,
    },
    streams: {
      type: String,
    },
    subject: {
      type: String,
      required: true,

    },
    status: {
      type: Boolean, // Changed from String to Boolean
      default: true, // You can set a default value if needed
    }
  },
  { timestamps: true }
);

// Create and export the model
const Modules = mongoose.model("modules", modulesSchema);
module.exports = Modules;
