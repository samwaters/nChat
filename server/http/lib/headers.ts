import {Response} from 'express';
export class HeaderUtils {
  public static addDefaultHeaders(response:Response) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
    response.status(200);
  }
}
