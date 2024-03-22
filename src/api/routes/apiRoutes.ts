import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import ChatController from '../controllers/ChatController';
import { checkAuthorization } from '../middlewares/checkAuthorization';
import {
  validateAddMessage,
  validateCredentials,
  validateGetMessages,
} from '../middlewares/validator';

const apiRoutes = Router();

// Authentication routes
apiRoutes.post('/auth', validateCredentials, AuthController.login);

// Chat routes
apiRoutes.post(
  '/chat/messages',
  checkAuthorization,
  validateAddMessage,
  ChatController.postMessage,
);
apiRoutes.get(
  '/chat/messages',
  validateGetMessages,
  checkAuthorization,
  ChatController.getMessages,
);

export default apiRoutes;
