import mongoose from "mongoose";

const RechargeRequestSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
});

const RechargeRequest = mongoose.model("RechargeRequest", RechargeRequestSchema);
export default RechargeRequest;
