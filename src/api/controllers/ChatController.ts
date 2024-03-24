import { Request, Response } from 'express';
import ChatService from '../services/ChatService';

class ChatController {
  static async postMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;
      const savedMessage = await ChatService.saveMessage(
        message,
        req.username!,
      );
      res.status(201).send({ message: savedMessage });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Failed to post message' });
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10;
      const keyword = req.query.keyword as string | undefined;

      const { messages, totalMessagesCount } = await ChatService.fetchMessages(
        page,
        itemsPerPage,
        keyword,
      );

      res.status(200).json({ messages, totalMessagesCount });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Failed to fetch messages' });
    }
  }
}

export default ChatController;
