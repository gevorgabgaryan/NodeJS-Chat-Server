import { WebSocket } from 'ws';

export class UserManager {
  private sockets: Set<WebSocket> = new Set();
  private authorizedUsersSockets: Record<string, WebSocket[]> = {};
  private subscribedRateSockets: Set<WebSocket> = new Set();

  add(socket: WebSocket): void {
    this.sockets.add(socket);
  }

  remove(socket: WebSocket): void {
    this.sockets.delete(socket);
    Object.entries(this.authorizedUsersSockets).forEach(([userId, sockets]) => {
      this.authorizedUsersSockets[userId] = sockets.filter((s) => s !== socket);
    });
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
