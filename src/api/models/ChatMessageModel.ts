import mongoose, { Document, Schema } from 'mongoose';

interface IChatMessage extends Document {
  _id: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  sender: string;
  message: string;
  date: Date;
  entitize(...args: string[]): any;
}

const ChatMessageSchema: Schema = new Schema<IChatMessage>(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ChatRoom',
    },
    sender: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

ChatMessageSchema.methods.entitize = function () {
  const args = Array.from(arguments);
  const res = this.toObject({ virtuals: true });
  delete res.__v;
  res.id = res._id;
  delete res._id;
  for (const item of args) {
    delete res[item];
  }
  return res;
};

const ChatMessage = mongoose.model<IChatMessage>(
  'ChatMessage',
  ChatMessageSchema,
);

export default ChatMessage;
