
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {WebsocketService} from '../services/websocket.service';
@Injectable()
export class MessageEffects {
  constructor(private actions$:Actions, private websocketService:WebsocketService) {

  }

  @Effect() sendMessage$ = this.actions$
    .ofType('SEND_MESSAGE')
    .map(action => action.payload)
    .map(payload => {
      console.log('Effect sending message');
      this.websocketService.send({
        type:0,
        message:payload
      });
      return {
        type: 'MESSAGE_SENT'
      };
    });
}

