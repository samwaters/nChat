import {IMessage, MessageTypes} from './message.interface';

export class ErrorMessage implements IMessage {
  private _code:number;
  private _message:string;

  constructor(code:number, message:string) {
    this._code = code;
    this._message = message;
  }

  public asString() {
    return JSON.stringify({
      code: this._code,
      message: this._message,
      type: MessageTypes.ERROR
    });
  }

  public get code():number {
    return this._code;
  }

  public get message():string {
    return this._message;
  }
}
