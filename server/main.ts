import {Server} from './server';
import {config} from './config';
console.log('Listening on port ', config.port);
let s = new Server();