import * as request from 'request';
import {Router, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import {config} from '../../config/server.config';

const api = Router();
let jsonParser = bodyParser.json();
api.get('/', (req, res:Response) => {
  res.status(200);
  res.header('Content-Type', 'application/json');
  res.send('{"status":"OK", "message":"API"}');
});
api.post('/users/create', jsonParser, (req:Request, res:Response) => {
  if(req.body && req.body.name && req.body.email && req.body.password && req.body.captcha) {
    request.post(
      'https://www.google.com/recaptcha/api/siteverify',
      {form:{secret:config.recaptcha.secret, response:req.body.captcha}},
      (error, response, body) => {
      if(!error) {
        res.status(200);
        let response = JSON.parse(body);
        res.send(JSON.stringify({
          status: 'OK',
          success: response.success
        }));
      } else {
        res.status(400);
        res.send('{"status":"error", "message":"Could not contact verification server"}');
      }
      res.end();

    });
  } else {
    res.status(400);
    res.send('{"status":"error", "message":"Invalid payload"}');
    res.end();
  }
});
api.post('/users/verify', jsonParser, (req:Request, res:Response) => {
  if(req.body && req.body.key) {
    res.status(418);
    req.body.modified = true;
    res.send(JSON.stringify(req.body));
    res.end();
  } else {
    res.status(400);
    res.send('{"status":"error", "message":"Invalid payload"}');
    res.end();
  }
});
export default api;

