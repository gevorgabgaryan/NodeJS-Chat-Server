import config from '../../config';
import ChatRoom from '../models/ChatRoomModel';

class DefaultChatRoom {
  static async init() {
    try {
      let defaultRoom = await ChatRoom.findOne({ name: 'Main' });
      if (!defaultRoom) {
        defaultRoom = new ChatRoom({
          name: 'Main',
        });
        await defaultRoom.save();
        console.log('Default chat room created.');
      } else {
        console.log('Default chat room already exists.');
      }
      config.defaultRoomId = defaultRoom._id.toString();
    } catch (error) {
      console.error('Error creating or fetching default chat room:', error);
    }
  }
}

export default DefaultChatRoom;
