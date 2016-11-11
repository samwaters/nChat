export enum MessageCommands {
  USER_JOIN, USER_LEAVE, LIST_USERS
}

export enum MessageTypes {
  MESSAGE, COMMAND, ERROR
}

export interface IMessage {
  asString():string;
}
