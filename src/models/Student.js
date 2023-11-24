import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  // add schema
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
