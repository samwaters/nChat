import * as request from 'request';
import {Router, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import {config} from '../../config/server.config';
import {Crypt, keyType} from './lib/crypt';
import {HeaderUtils} from './lib/headers';

const api = Router();
let jsonParser = bodyParser.json();
api.post('/users/create', jsonParser, (req:Request, res:Response) => {
  HeaderUtils.addDefaultHeaders(res);
  if(req.body && req.body.name && req.body.email && req.body.password && req.body.captcha) {
    request.post(
      'https://www.google.com/recaptcha/api/siteverify',
      {form:{secret:config.recaptcha.secret, response:req.body.captcha}},
      (error, response, body) => {
      if(!error) {
        let response = JSON.parse(body);
        res.send(JSON.stringify({
          status: 'OK',
          success: response.success
        }));
      } else {
        res.status(400);
        res.send('{"status":"error", "message":"Could not contact verification server"}');
      }
    });
  } else {
    res.status(400);
    res.send('{"status":"error", "message":"Invalid payload"}');
  }
  res.end();
});
api.options('/users/verify', (req:Request, res:Response) => {
  HeaderUtils.addDefaultHeaders(res);
  res.end();
});
api.post('/users/verify', jsonParser, (req:Request, res:Response) => {
  HeaderUtils.addDefaultHeaders(res);
  if(req.body && req.body.message && req.body.publicKey) {
    let decrypted = Crypt.decrypt(req.body.message);
    let decoded = JSON.parse(decrypted);
    let response = {
      status: 'OK',
      message: Crypt.encrypt('Your name is ' + decoded.name, keyType.CUSTOM_PUBLIC, req.body.publicKey)
    };
    res.send(JSON.stringify(response));
  } else {
    res.status(400);
    res.send('{"status":"error", "message":"Invalid payload"}');
  }
  res.end();
});
export default api;

