///<reference path="../../assets/jsencrypt.d.ts" />
import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {clientConfig} from '../../../config/client.config';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {Store} from '@ngrx/store';
import {settingsActions} from '../reducers/settings.reducer';
let enc = require('jsencrypt');

interface AppState {
  messages: Array<any>;
  settings:any;
  users: Array<any>;
}

@Injectable()
export class ApiService {
  private _serverCrypt:JSEncrypt;
  private _clientCrypt:JSEncrypt;
  public ready:BehaviorSubject<boolean>;
  private _settings:Observable<any>;

  constructor(private http:Http, private store:Store<AppState>) {
    this.ready = new BehaviorSubject<boolean>(false);
    this.store.dispatch(settingsActions.generateClientKeyPair(clientConfig.defaultKeySize));
    this.store.dispatch(settingsActions.requestServerPublicKey());
    this._settings = store.select('settings');
    this._settings.subscribe((settings) => {
      if(
        settings.keys.client.privateKey !== ''
        && settings.keys.client.publicKey !== ''
        && settings.keys.server.publicKey !== ''
      ) {
        this._clientCrypt = new enc.JSEncrypt();
        this._clientCrypt.setPrivateKey(settings.keys.client.privateKey);
        //this._clientCrypt.setPublicKey(settings.keys.client.publicKey);
        this._serverCrypt = new enc.JSEncrypt();
        this._serverCrypt.setPublicKey(settings.keys.server.publicKey);
        this.ready.next(true);
      }
    });
  }

  /*
   * Outgoing (client -> server) messages
   * * Encrypted on the client using the server's public key
   * * Decrypted using the server using the server's public key
   * Incoming (server -> client) messages
   * * Encrypted on the server using the public key provided by the client (in the message)
   * * Decrypted on the client using the client's private key
   */
  public apiRequest(endpoint:string, type:string, body?:any):ReplaySubject<any> {
    let request:Observable<Response>;
    let response:ReplaySubject<any> = new ReplaySubject<any>(1);
    endpoint = clientConfig.api + endpoint;
    if(type === 'post') {
      if(typeof body !== 'string') {
        body = JSON.stringify(body);
      }
      let message = {
        message: this._serverCrypt.encrypt(body),
        publicKey: this._clientCrypt.getPublicKeyB64()
      };
      request = this.http.post(endpoint, message);
    } else {
      let headers = new Headers();
      headers.append('X-PUBLIC-KEY', this._clientCrypt.getPublicKeyB64());
      request = this.http.get(endpoint, {headers: headers});
    }
    request.take(1).subscribe((res:Response) => {
      let decrypted = this._clientCrypt.decrypt(res.json().message);
      response.next(decrypted);
    });
    return response;
  }

  public getClientPublicKey():string {
    return this._clientCrypt.getPublicKeyB64();
  }

  public getServerPublicKey():string {
    return this._serverCrypt.getPublicKeyB64();
  }
}
