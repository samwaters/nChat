import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {userActions} from '../reducers/user.reducer';
import {IAppState} from '../reducers/state.interface';

@Injectable()
export class UserService {
  public users:Observable<any>;

  constructor(private store:Store<IAppState>) {
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
