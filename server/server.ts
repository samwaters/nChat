import {TextMessage} from './messages/text.message';
import {IMessage, MessageTypes, MessageCommands} from './messages/message.interface';
import {config} from '../config/server.config';
import * as WebSocket from 'ws';
import {Server as WSServer} from 'ws';
import {ErrorMessage} from './messages/error.message';
import {CommandMessage} from './messages/command.message';

interface NamedWebSocket extends WebSocket {
  id?:string;
}

export class Server {
  private clients:Array<any> = [];
  private websocketServer:WSServer;

  constructor() {
    this.websocketServer = new WSServer({
      port: config.port
    });
    this.websocketServer.on('connection', (conn:NamedWebSocket) => { this._acceptConnection(conn); });
  }

  private _acceptConnection(conn:NamedWebSocket) {
    conn.id = this._generateId();
    conn.on('message', (message:string) => {
      this._processMessage(message, conn);
    });
    conn.on('close', () => {
        this.clients.splice(this.clients.indexOf(conn), 1);
        this._broadcast(new CommandMessage('_SERVER_', MessageCommands.USER_LEAVE, conn.id));
      });
    this._broadcast(new CommandMessage('_SERVER_', MessageCommands.USER_JOIN, conn.id));
    conn.send(new TextMessage('_SERVER_', 'Welcome to the server').asString());
    this.clients.push(conn);
  }

  private _broadcast(message:IMessage) {
    let str = message.asString();
    this.clients.forEach((connection) => {
      try {
        connection.send(str);
      } catch(e) {}
    });
  }

  private _generateId():string {
    return 'user@' + new Date().getTime();
  }

  private _processCommand(command:CommandMessage, connection:NamedWebSocket) {
    switch(command.command) {
      case MessageCommands.LIST_USERS:
        let users = this.clients.map(el => el.id);
        connection.send(new CommandMessage('_SERVER_', MessageCommands.LIST_USERS, users).asString());
        break;
      default:
        connection.send(new ErrorMessage(500, 'Unknown Command').asString());
    }
  }

  private _processMessage(message:string, connection:NamedWebSocket) {
    try {
      let decoded = JSON.parse(message);
      if(decoded.type !== MessageTypes.MESSAGE && decoded.type !== MessageTypes.COMMAND) {
        connection.send(new ErrorMessage(501, 'Unsupported Message Type').asString());
        return;
      }
      if(decoded.type === MessageTypes.COMMAND) {
        this._processCommand(new CommandMessage(connection.id, decoded.command), connection);
      } else {
        this._broadcast(new TextMessage(connection.id, decoded.message));
      }
    } catch(e) {
      // Not a valid message? Treat it as text
      console.log('Decode error', e.message, message, typeof message);
      this._broadcast(new TextMessage(connection.id, message));
    }
  }

  private _verifyOrigin(origin:string):boolean {
    return (config.allowedOrigins.indexOf('*') >= 0 || config.allowedOrigins.indexOf(origin) >= 0);
  }
}
