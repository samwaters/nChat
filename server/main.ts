import {WebsocketServer} from './ws.server';
import {config} from '../config/server.config';
import {HttpServer} from './http.server';
console.log('HTTP server listening on port ', config.ports.http);
console.log('Websocket server listening on port ', config.ports.ws);
let h = new HttpServer();
let s = new WebsocketServer();
