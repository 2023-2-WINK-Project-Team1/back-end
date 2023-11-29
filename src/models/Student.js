import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  // add schema
    _id: { type: String, required: true },
    student_number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notification : { type: Boolean, default: true },
    is_manager : { type: Boolean, default: false }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
