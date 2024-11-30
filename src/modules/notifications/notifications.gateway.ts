import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } }) // Enable CORS for frontend connection
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  // Map to store user-to-socket mappings
  private customerConnections = new Map<string, string>();


  // Handle a client connection
  handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
  }

  // Handle a client disconnection
  handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
      for(const [orderId, socketId] of this.customerConnections.entries()) {
        if (socketId === client.id) {
            this.customerConnections.delete(orderId);
            break;
        }
      }
  }

  registerCustomer(orderId: string, clientId: string) {
    this.customerConnections.set(orderId, clientId);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
      console.log(`Message from client ${client.id}:`, data);
  }

  // Send a notification to a specific client
  notifyCustomer(orderId: string, message: any) {
    const clientId = this.customerConnections.get(orderId);
    if (clientId) {
        this.server.to(clientId).emit('notification', message);
    } else {
        console.log(`Customer ${orderId} not connected`);
    }
  }
}
