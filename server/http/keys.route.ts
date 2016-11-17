import {Router, Request, Response} from 'express';
import {Crypt} from './lib/crypt';
import {HeaderUtils} from './lib/headers';

const keys = Router();
keys.options('/public', (req:Request, res:Response) => {
  HeaderUtils.addDefaultHeaders(res);
  res.end();
});
keys.get('/public', (req:Request, res:Response) => {
  HeaderUtils.addDefaultHeaders(res);
  let response:any = {};
  response.status = 'OK';
  response.key = Crypt.keys.publicKey;
  res.send(JSON.stringify(response));
});
export default keys;
