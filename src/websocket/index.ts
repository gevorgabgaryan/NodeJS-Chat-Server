import { WebSocketServer } from 'ws';
import config from '../config';
import { UserManager } from './UserManager';
import { RequestsManager } from './RequestsManager';

const userManager = UserManager.getInstance();
const requestsManager = new RequestsManager();
export class WebSocketService {
  private wsServer: WebSocketServer | null = null;

  constructor() {}

  async init(): Promise<void> {
    this.wsServer = new WebSocketServer({ port: config.wsPort });

    this.wsServer.on('connection', (socket) => {
      socket.on('message', (data) => {
        const payload = data.toString();
        requestsManager.handleRequests(socket, payload);
      });

      socket.on('close', (code, reason) => {
        console.log(
          `Client has disconnected; code ${code}, reason: ${reason.toString()}`,
        );
        userManager.remove(socket);
      });

      socket.send('Welcome to the WebSocket server!');
    });

    console.log(`WebSocket server is running on port ${config.wsPort}`);
  }

  static deleteMessage(id: string): void {
    userManager.sendToAll({
      event: 'delete-message',
      message: {
        id
      },
    });
  }
}
