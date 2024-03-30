import API from './api';
import MongooseService from './databases/MongooseService';
import DefaultChatRoom from './api/helper/DefaultChatRoom';
import { WebSocketService } from './websocket';
import logger from './lib/logger';
import { BaseError } from './errors/BaseError';

(async () => {
  try {
    await MongooseService.init();
    await API.init();
    await DefaultChatRoom.init();
    const webSocketService = new WebSocketService();
    await webSocketService.init();
    console.log('App started')
  } catch (e) {
    logger.info(e);
    process.exit(1);
  }
})();

process.on(
  'unhandledRejection',
  (reason: {} | null | undefined, promise: Promise<any>) => {
    const message =
      reason instanceof Error ? reason.message : 'Unhandled Promise Rejection';
    const errorDetails =
      reason instanceof Error ? reason.stack : JSON.stringify(reason);

    const baseError = new BaseError(500, 'UNHANDLED_REJECTION', message, [
      { message: errorDetails },
    ]);

    logger.error(baseError);
  },
);

process.on('uncaughtException', (err: Error) => {
  const baseError = new BaseError(500, 'UNCAUGHT_EXCEPTION', err.message, [
    { message: err.stack },
  ]);

  logger.error(baseError);
});
