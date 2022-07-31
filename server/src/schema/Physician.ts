import mongoose from "mongoose";

const physician = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
})

export default mongoose.model("Physician", physician);