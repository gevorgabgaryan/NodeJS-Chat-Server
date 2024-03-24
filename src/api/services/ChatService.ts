import config from '../../config';
import ChatMessage from '../models/ChatMessageModel';
import { escapeRegExp } from '../../utils';
import { WebSocketService } from '../../websocket';

class ChatService {
  static async saveMessage(message: string, sender: string) {
    const newMessage = new ChatMessage({
      roomId: config.defaultRoomId,
      sender,
      message,
    });

    const savedMessage = await newMessage.save();
    return savedMessage.entitize('createdAt', 'updatedAt');
  }

  static async fetchMessages(
    page: number,
    itemsPerPage: number,
    keyword?: string,
  ) {
    const query: any = {
      roomId: config.defaultRoomId,
    };

    if (keyword) {
      const safeKeyword = escapeRegExp(keyword);
      const regex = new RegExp(safeKeyword, 'i');
      query.message = { $regex: regex };
    }

    const messages = await ChatMessage.find(query)
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .sort({ date: -1 });

    const totalMessagesCount = await ChatMessage.countDocuments(query);

    return {
      messages: messages.map((e) => e.entitize('createdAt', 'updatedAt')),
      totalMessagesCount,
    };
  }

  static async deleteMessage(
    id: string
  ) {
    const { deletedCount } = await ChatMessage.deleteOne({ _id: id })
    if (deletedCount === 0) {
      throw new Error('Message not found')
    }
    WebSocketService.deleteMessage(id);
  }
}

export default ChatService;
