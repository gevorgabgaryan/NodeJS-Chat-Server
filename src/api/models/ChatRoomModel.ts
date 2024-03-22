import mongoose, { Document, Schema } from 'mongoose';

export interface IChatRoom extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatRoomSchema: Schema = new Schema<IChatRoom>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ChatRoom = mongoose.model<IChatRoom>('ChatRoom', ChatRoomSchema);

export default ChatRoom;
