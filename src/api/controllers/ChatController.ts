import { Request, Response } from 'express';
import ChatService from '../services/ChatService';

class ChatController {
  static async postMessage(req: Request, res: Response) {
    try {
      const { message } = req.body;
      res.promisify!(await ChatService.saveMessage(message, req.username!));
    } catch (e) {
      res.promisify!(Promise.reject(e));
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10;
      const keyword = req.query.keyword as string | undefined;
      res.promisify!(
        await ChatService.fetchMessages(page, itemsPerPage, keyword),
      );
    } catch (e) {
      res.promisify!(Promise.reject(e));
    }
  }

  static async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      res.promisify!(await ChatService.deleteMessage(id));
    } catch (e) {
      res.promisify!(Promise.reject(e));
    }
  }
}

export default ChatController;
