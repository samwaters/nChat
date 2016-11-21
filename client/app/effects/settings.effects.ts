import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {settingsActionTypes, settingsActions} from '../reducers/settings.reducer';
import {Http} from '@angular/http';
import {clientConfig} from '../../../config/client.config';
let enc = require('jsencrypt');
@Injectable()
export class SettingsEffects {
  constructor(private actions$:Actions, private http:Http) {}

  @Effect() generateClientKeypair$ = this.actions$
    .ofType(settingsActionTypes.GENERATE_CLIENT_KEYPAIR)
    .map(action => {
      let crypt:JSEncrypt = new enc.JSEncrypt({default_key_size:action.payload});
      return settingsActions.storeClientKeyPair(crypt.getPrivateKeyB64(), crypt.getPublicKeyB64());
    });
  @Effect() requestServerPublicKey$ = this.actions$
    .ofType(settingsActionTypes.REQUEST_SERVER_PUBLICKEY)
    .switchMap(action => this.http.get(clientConfig.keyServer + '/public'))
    .map(result => result.json())
    .map(json => {
      return settingsActions.storeServerPublicKey(json.key);
    });
}


