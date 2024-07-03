const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appliedScholarshipSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    studentnumber: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,    
    },
    faculty: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    scholarshipname:{
        type: String,
        required: true, 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AppliedScholarship", appliedScholarshipSchema);
