import { UserManager } from './UserManager';
import AuthService from '../api/services/AuthService';
import { WebSocket } from 'ws';
import { AuthenticatedWebSocket } from './interface/AuthenticatedWebSocket';
import { addMessageSchema, tokenSchema } from '../lib/validator';
import ChatService from '../api/services/ChatService';
import { UnAuthorizedError } from '../errors/UnAuthorizedError';
import { AppError } from '../errors/AppError';
import logger from '../lib/logger';
import { BaseError } from '../errors/BaseError';
import { RedisPubSub } from '../lib/redis';

export class RequestsManager {
  private callsList: { [key: string]: any } = {};
  private userManager: UserManager;

  constructor() {
    this.userManager = UserManager.getInstance();
    this.initCalls();
  }

  initCalls() {
    this.registerCall(
      'authorize',
      async (socket: AuthenticatedWebSocket, params: { token: string }) => {
        try {
          const { error } = tokenSchema.validate(params.token);
          if (error) {
            throw new UnAuthorizedError();
          }

          const username = await AuthService.checkToken(params.token);
          if (!username) {
            throw new UnAuthorizedError();
          }
          this.userManager.add(socket);
          socket.username = username;
          socket.isAuthenticated = true;
          this.send(socket, { message: 'Successfully authorized' });
        } catch (e: any) {
          if (e instanceof UnAuthorizedError) {
            return this.send(socket, new UnAuthorizedError());
          }
          return this.send(socket, new AppError());
        }
      },
    );

    this.registerCall(
      'new-message',
      async (
        socket: AuthenticatedWebSocket,
        params: { message: string }
      ) => {
        try {
          const { error } = addMessageSchema.validate(params);
          if (error) {
            return this.send(
              socket,
              new BaseError(
                404,
                'BAD_REQUEST',
                `Invalid message ${error.details[0].message}`,
              ),
            );
          }

          if (!socket.username) {
            throw new UnAuthorizedError();
          }

          const savedMessage = await ChatService.saveMessage(
            params.message,
            socket.username,
          );

          const data = {
            event: 'new-message',
            message: savedMessage,
          };
          const redisPubSub = RedisPubSub.getInstance();
          redisPubSub.publish('new-message', JSON.stringify(data))
        } catch (e) {
          logger.error(e)
          if (e instanceof UnAuthorizedError) {
            return this.send(socket, e);
          }
          this.send(socket, new AppError());
        }
      },
    );
  }

  async handleRequests(socket: AuthenticatedWebSocket, data: string) {
    try {
      const payload = JSON.parse(data.toString());

      const { event, params } = payload;
      if (!event) {
        throw new BaseError(404, 'BAD_REQUEST', 'Event required');
      }
      if (!params) {
        throw new BaseError(404, 'BAD_REQUEST', 'Params required');
      }

      if (event !== 'authorize' && !socket.isAuthenticated) {
        this.send(socket, new UnAuthorizedError());
      }

      const callObj = this.callsList[event];
      if (!callObj) {
        throw new BaseError(404, 'BAD_REQUEST', 'Unexpected event');
      }

      await callObj.callback(socket, params);
    } catch (e: any) {
      logger.error(e);
      if (e instanceof BaseError) {
        return this.send(socket, e);
      }

      if (e instanceof SyntaxError) {
        return this.send(socket, new BaseError(400,  "BAD_REQUEST", `${e.message ? e.message: JSON.stringify(e).slice(0,100)}`));
      }
      this.send(socket, new AppError(e.message? e.message : "Unexpected error"));
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
