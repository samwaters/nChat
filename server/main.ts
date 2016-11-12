import {Server} from './server';
import {config} from '../config/server.config';
console.log('Listening on port ', config.port);
let s = new Server();
