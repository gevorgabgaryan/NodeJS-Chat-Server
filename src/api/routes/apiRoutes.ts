import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import ChatController from '../controllers/ChatController';
import { checkAuthorization } from '../middlewares/checkAuthorizationMiddleware';
import {
  validateAddMessage,
  validateCredentials,
  validateGetMessages,
  validateParamsObjectId,
} from '../middlewares/validatorMiddleware';

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

apiRoutes.delete(
  '/chat/messages/:id',
  validateParamsObjectId,
  checkAuthorization,
  ChatController.deleteMessage,
);

export default apiRoutes;
