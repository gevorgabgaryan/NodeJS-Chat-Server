import WebSocket from 'ws';

export interface AuthenticatedWebSocket extends WebSocket {
  username?: string;
  isAuthenticated?: boolean;
}
