import {ActionReducer, Action} from '@ngrx/store';
const userActionTypes = {
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER',
  SET_USERS: 'SET_USERS'
};

interface IUserActions {
  addUser:Function;
  removeUser:Function;
}

export const userActions:IUserActions = {
  addUser: (user:string):Action => {
    return {
      type: userActionTypes.ADD_USER,
      payload: user
    };
  },
  removeUser: (user:string):Action => {
    return {
      type: userActionTypes.REMOVE_USER,
      payload: user
    };
  },
  setUsers: (users:Array<string>):Action => {
    return {
      type: userActionTypes.SET_USERS,
      payload: users
    }
  }
};

export const userReducer:ActionReducer<Array<any>> = (state:Array<any> = ['a', 'b', 'c'], action:Action) => {
  switch(action.type) {
    case userActionTypes.ADD_USER:
      return [...state, action.payload];
    case userActionTypes.REMOVE_USER:
      return [...state].filter(user => user !== action.payload);
    case userActionTypes.SET_USERS:
      return [...action.payload];
    default:
      return state;
  }
};
