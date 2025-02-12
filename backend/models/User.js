import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    credits: { 
        type: Number, 
        default: 5 
    },
    maxCredits: {
        type: Number,
        default: 5
    },
    lastEmailSent: {
        type: Date,
        default: null
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

const User = mongoose.model("User", UserSchema);
export default User;