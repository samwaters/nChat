import {TextMessage} from './text.message';
import {IMessage, MessageTypes} from './message.interface';
import {CommandMessage} from './command.message';

export class MessageFactory {
  public static fromObject(message:any):IMessage {
    if(typeof message.type === 'undefined') {
      console.warn('Unable to parse message');
      return null;
    }
    switch(message.type) {
      case MessageTypes.COMMAND:
        return new CommandMessage(message.username, message.command, message.data);
      case MessageTypes.MESSAGE:
        return new TextMessage(message.username, message.message);
      default:
        console.warn('Unknown message type', message.type);
        return null;
    }
  }

  public static fromString(message:string):IMessage {
    let data = JSON.parse(message);
    if(!data || typeof data.type === 'undefined') {
      console.warn('Unable to parse message', data);
      return null;
    }
    return MessageFactory.fromObject(data);
  }
}
