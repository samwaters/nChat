import {IMessage, MessageTypes} from './message.interface';

export class TextMessage implements IMessage {
  private _message:string;
  private _from:string;

  constructor(from:string, message:string) {
    this._from = from;
    this._message = message;
  }

  public asString() {
    return JSON.stringify({
      type: MessageTypes.MESSAGE,
      message: this._message,
      username: this._from
    });
  }

  public get from() {
    return this._from;
  }

  public get message() {
    return this._message;
  }
}