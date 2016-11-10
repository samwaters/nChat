import {ActionReducer, Action} from '@ngrx/store';
const messageActionTypes = {
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED'
};

interface IMessageActions {
  messageReceived:Function;
}

export const messageActions:IMessageActions = {
  messageReceived: (user:string):Action => {
    return {
      type: messageActionTypes.MESSAGE_RECEIVED,
      payload: user
    };
  }
};

export const messageReducer:ActionReducer<Array<any>> = (state:Array<any> = [], action:Action) => {
  switch(action.type) {
    case messageActionTypes.MESSAGE_RECEIVED:
      return [...state, action.payload];
    default:
      return state;
  }
};

