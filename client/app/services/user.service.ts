import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {userActions} from '../reducers/user.reducer';

interface AppState {
  messages: Array<any>;
  users: Array<any>;
}

@Injectable()
export class UserService {
  public users:Observable<any>;

  constructor(private store:Store<AppState>) {
    this.users = store.select('users');
  }

  public onUserJoined(user:string) {
    this.store.dispatch(userActions.addUser(user));
  }

  public onUserLeft(user:string) {
    this.store.dispatch(userActions.removeUser(user));
  }

  public onUserListReceived(data:Array<string>) {
    this.store.dispatch(userActions.setUsers(data));
  }

  public requestUserList() {
    this.store.dispatch({type:'GET_USER_LIST'});
  }
}
