import mongoose from "mongoose";
import ChatRoom from "../models/ChatRoomModel";
import config from "../../config";

class DefaultChatRoom {
  static async init() {
    try {
      const roomCount = await ChatRoom.countDocuments();
      if (roomCount === 0) {
        const defaultRoom = new ChatRoom({
          name: "Main",
        });
        await defaultRoom.save();
      }
    } catch (error) {
      console.error("Error creating default chat room:", error);
    }
  }
}

export default DefaultChatRoom;
