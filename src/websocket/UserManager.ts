import { WebSocket } from 'ws';

export class UserManager {
  private static instance: UserManager;
  private sockets: Set<WebSocket> = new Set();

  private constructor() {}

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  add(socket: WebSocket): void {
    this.sockets.add(socket);
  }

  remove(socket: WebSocket): void {
    this.sockets.delete(socket);
  }

  sendToAll(message: object): void {
    const data = JSON.stringify(message);
    this.sockets.forEach((socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    });
  }
}
