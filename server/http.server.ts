import {config} from '../config/server.config';
import * as express from 'express';
import index from './http/index.route';

export class HttpServer {
  private _server:express.Express;
  public constructor() {
    this._server = express();
    this._configureRoutes();
    this._server.listen(config.ports.http);
  }

  private _configureRoutes() {
    this._server.use('/', index);
  }
}
