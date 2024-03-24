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
