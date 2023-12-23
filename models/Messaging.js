import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    // Add any other relevant fields for your messaging system
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
