import { Injectable } from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class WebsocketService {
  private _queue:Array<string> = [];
  private _socket:WebSocket;

  constructor(private userService:UserService) {
    this.connect();
  }

  public connect() {
    this._socket = new WebSocket('ws://localhost:9002');
    this._socket.onmessage = (ev:MessageEvent) => {
      this._handleMessage(ev.data);
    };
    this._socket.onopen = (ev:Event) => {
      this._queue.forEach((msg:string) => {
        this._socket.send(msg);
      })
    };
    this._socket.onerror = (ev:Event) => {
      console.warn('Websocket error', ev);
    }
  }

  public disconnect() {
    this._socket.close();
    this._socket = null;
  }

  public isConnected():boolean {
    return this._socket && this._socket.readyState === 1;
  }

  public send(message:any) {
    if(typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    if(this.isConnected()) {
      this._socket.send(message);
    } else {
      this._queue.push(message);
    }
  }

  private _handleMessage(message) {
    try {
      let decoded = JSON.parse(message);
      if(decoded.type === 0) {
        console.log('Got a message!', decoded);
      } else if(decoded.type === 1) {
        switch(decoded.command) {
          case 0:
            this.userService.onUserJoined(decoded.data);
            break;
          case 1:
            this.userService.onUserLeft(decoded.data);
            break;
          case 2:
            this.userService.onUserListReceived(decoded.data);
            break;
          default:
            console.warn('Unknown command');
        }
      }
    } catch(e) {
      console.warn('Could not parse response data from server', message);
    }
  }

}
