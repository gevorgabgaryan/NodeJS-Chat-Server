import API from './api';
import MongooseService from './databases/MongooseService';
import DefaultChatRoom from './api/helper/DefaultChatRoom';
import { WebSocketService } from './websocket';

(async () => {
  try {
    await MongooseService.init();
    await API.init();
    await DefaultChatRoom.init();
    const webSocketService = new WebSocketService();
    await webSocketService.init();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();

// TODO: Add Logger with Winston
// 1. Install Winston: Run `npm install winston`.
// 2. Create a logger configuration: Set up different transports for development and production (e.g., console and file).
// 3. Implement logging throughout the application: Replace console.log statements with logger.info or logger.error as appropriate.
// 4. Use middleware for logging incoming requests: Consider using `morgan` with Winston for HTTP request logging.

// TODO: Implement Centralized Error Handling
// 1. Create an error handling middleware: This should catch any errors thrown in the application.
// 2. Standardize error response: Ensure the middleware sends responses in a consistent format (e.g., status code, message).
// 3. Use try/catch in async operations: Properly catch and forward errors to the middleware.
// 4. Log errors: Utilize the Winston logger to log errors for monitoring and debugging.