import {Router, Response} from 'express';
const index = Router();
index.get('/', (req, res:Response) => {
  res.status(200);
  res.header('Content-Type', 'application/json');
  res.send('{"status":"OK", "message":"Default Route"}');
});
export default index;
