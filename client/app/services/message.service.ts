import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {messageActions} from '../reducers/message.reducer';
import {IAppState} from '../reducers/state.interface';

@Injectable()
export class MessageService {
  public messages:Observable<any>;

  constructor(private store:Store<IAppState>) {
    this.messages = store.select('messages');
  }

  public onMessageReceived(message) {
    this.store.dispatch(messageActions.messageReceived(message));
  }

  public sendMessage(message:string) {
    this.store.dispatch({
      type: 'SEND_MESSAGE',
      payload: message
    });
  }
}
