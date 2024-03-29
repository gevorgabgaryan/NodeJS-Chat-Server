import config from '../../config';
import logger from '../../lib/logger';
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
      }
      config.defaultRoomId = defaultRoom._id.toString();
    } catch (error) {
      logger.error('Error creating or fetching default chat room:', error);
    }
  }
}

export default DefaultChatRoom;
