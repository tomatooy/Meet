import mongoose from "mongoose";
import User from "./User.js";
const messageSchema = new mongoose.Schema({
    users: Array,
    text: String,
    from: String,
    to:String
},
    {
        timestamps: true // Enable timestamps
    });

const Message = mongoose.model('Message', messageSchema);

export default Message