import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

interface AppState {
  users: Array<any>;
}

@Injectable()
export class UserService {
  public users:Observable<any>;

  constructor(private store:Store<AppState>) {
    this.users = store.select('users');
  }
}
