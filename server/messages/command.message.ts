import {IMessage, MessageTypes} from './message.interface';

export class CommandMessage implements IMessage {
  private _command:number;
  private _data:any;
  private _username:string;

  constructor(username:string, command:number, data?:any) {
    this._username = username;
    this._command = command;
    this._data = data;
  }

  public asString() {
    return JSON.stringify({
      command: this._command,
      data: this._data,
      type: MessageTypes.COMMAND,
      username: this._username
    });
  }

  public get command():number {
    return this._command;
  }

  public get data():any {
    return this._data;
  }

  public get username():string {
    return this._username;
  }
}
