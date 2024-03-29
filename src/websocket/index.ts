import { WebSocketServer } from 'ws';
import config from '../config';
import { UserManager } from './UserManager';
import { RequestsManager } from './RequestsManager';
import Redis from 'ioredis';
import logger from '../lib/logger';
import { RedisPubSub } from '../lib/redis';

const userManager = UserManager.getInstance();
const requestsManager = new RequestsManager();
export class WebSocketService {
  private wsServer: WebSocketServer | null = null;
  private redisPubSub: RedisPubSub;

  constructor() {
    this.redisPubSub = RedisPubSub.getInstance();
    try{
      this.redisPubSub.subscribe(
        'new-message',
        (channel: string, message: string) => {
          if (channel === 'new-message') {
            this.broadcastMessage(JSON.parse(message));
          }
        },
      );
    } catch (error: any) {
      logger.error(`Error subscribing to channel: ${error.message}`);
    }
  }

  async init(): Promise<void> {
    this.wsServer = new WebSocketServer({ port: config.wsPort });

    this.wsServer.on('connection', (socket) => {
      logger.info('new connect')
      socket.on('message', (data) => {
      const payload = data.toString();
        requestsManager.handleRequests(socket, payload);
      });

      socket.on('close', (code, reason) => {
        logger.info(
          `Client has disconnected; code ${code}, reason: ${reason.toString()}`,
        );
        userManager.remove(socket);
      });

      socket.send('Welcome to the WebSocket server!');
    });

    logger.info(`WebSocket server is running on port ${config.wsPort}`);
  }

  broadcastMessage(data: any) {
    userManager.sendToAll(data);
  }

  static deleteMessage(id: string): void {
    userManager.sendToAll({
      event: 'delete-message',
      message: {
        id,
      },
    });
  }
}
