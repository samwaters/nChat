import { Injectable } from '@angular/core';

@Injectable()
export class WebsocketService {
  private _socket:WebSocket;

  constructor() {

  }

  public connect() {
    this._socket = new WebSocket('ws://localhost:9002');
    this._socket.onmessage = (ev:MessageEvent) => {
      this._handleMessage(ev.data);
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
    if(this.isConnected()) {
      if(typeof message !== 'string') {
        message = JSON.stringify(message);
      }
      this._socket.send(message);
    } else {
      console.warn('Attempting to send on a closed socket');
    }
  }

  private _handleMessage(message) {

  }

}
