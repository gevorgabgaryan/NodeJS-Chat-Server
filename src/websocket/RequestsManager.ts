import { UserManager } from './UserManager';
import AuthService from '../api/services/AuthService';
import { WebSocket } from 'ws';
import { AuthenticatedWebSocket } from './interface/AuthenticatedWebSocket';
import { addMessageSchema, tokenSchema } from '../lib/validator';
import ChatService from '../api/services/ChatService';
import Redis from 'ioredis';
import config from '../config';

export class RequestsManager {
  private callsList: { [key: string]: any } = {};
  private userManager: UserManager;

  constructor() {
    this.userManager =  UserManager.getInstance();
    this.initCalls();
  }

  initCalls() {
    this.registerCall(
      'authorize',
      async (socket: AuthenticatedWebSocket, params: { token: string }) => {
        try {
          const { error } = tokenSchema.validate(params.token);
          if (error) {
            console.error(`Token validation error: ${error.message}`);
            return this.send(socket, { error: true, message: 'Invalid token' });
          }

          const username = await AuthService.checkToken(params.token);
          if (!username) {
            throw new Error('Unauthorized');
          }

          this.userManager.add(socket);
          socket.username = username;
          socket.isAuthenticated = true;
          this.send(socket, { message: 'Successfully authorized' });
        } catch (e) {
          console.error(e);
          this.send(socket, { error: true, message: 'Unauthorized' });
        }
      },
    );

    this.registerCall(
      'new-message',
      async (socket: AuthenticatedWebSocket, params: { message: string }) => {


        try {
          const { error } = addMessageSchema.validate(params);
          if (error) {
            return this.send(socket, {
              error: true,
              message: `Invalid message ${error.details[0].message}`,
            });
          }

          if (!socket.username) {
            throw new Error('Unauthorized');
          }

          const savedMessage = await ChatService.saveMessage(
            params.message,
            socket.username,
          );

          const data = {
            event: 'new-message',
            message: savedMessage,
          }

          this.userManager.sendToAll(data);

          const redisPub = new Redis(config.redisUrl);
           redisPub.publish('chatMessages', JSON.stringify(data));
        } catch (e) {
          console.error(e);
          this.send(socket, { error: true, message: 'Unexpected error' });
        }
      },
    );
  }

  async handleRequests(socket: AuthenticatedWebSocket, data: string) {
    try {
      const payload = JSON.parse(data.toString());

      const { event, params } = payload;
      if (!event) {
        throw new Error('Event name required');
      }
      if (!params) {
        throw new Error('Params required');
      }

      if (event !== 'authorize' && !socket.isAuthenticated) {
        this.send(socket, { error: 'Unauthorized' });
      }

      const callObj = this.callsList[event];
      if (!callObj) {
        throw new Error('Unexpected event');
      }

      await callObj.callback(socket, params);
    } catch (e: any) {
      console.error(e);
      this.send(socket, {
        error: true,
        message: e.message || 'An error occurred',
      });
    }
  }

  send(socket: WebSocket, message: object) {
    const data = JSON.stringify(message);
    socket.send(data);
  }

  registerCall(callName: string, callback: Function) {
    this.callsList[callName] = { callback };
  }
}
