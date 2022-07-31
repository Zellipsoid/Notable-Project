import mongoose, { Schema } from "mongoose";

const physician = new mongoose.Schema({
    firstName: String,
    lastName: String,
    datetime: Date,
    kind: String,
    physicianId: {
        type: Schema.Types.ObjectId, 
        ref: 'Physician'
    }

})

export default mongoose.model("Physician", physician);