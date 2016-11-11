
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {WebsocketService} from '../services/websocket.service';
@Injectable()
export class UserEffects {
  constructor(private actions$:Actions, private websocketService:WebsocketService) {

  }

  @Effect() userList$ = this.actions$
    .ofType('GET_USER_LIST')
    .map(action => action.payload)
    .map(payload => {
      console.log('Effect getting user list');
      this.websocketService.send({
        type:1,
        command:2
      });
      return {
        type: 'USER_LIST_REQUESTED'
      };
    });
}
