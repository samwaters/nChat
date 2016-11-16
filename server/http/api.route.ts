import {Router, Response} from 'express';
const api = Router();
api.get('/', (req, res:Response) => {
  res.status(200);
  res.header('Content-Type', 'application/json');
  res.send('{"status":"OK", "message":"API"}');
});
export default api;

