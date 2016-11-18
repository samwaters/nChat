///<reference path="../../assets/jsencrypt.d.ts" />
import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {clientConfig} from '../../../config/client.config';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

@Injectable()
export class ApiService {
  private _serverCrypt:JSEncrypt;
  private _clientCrypt:JSEncrypt;
  public ready:BehaviorSubject<boolean>;

  constructor(private http:Http) {
    this.ready = new BehaviorSubject<boolean>(false);
    this._generateKeyPair(clientConfig.defaultKeySize);
    this._getServerPublicKey();
    this._clientCrypt = new JSEncrypt({default_key_size: clientConfig.defaultKeySize});
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
      console.log('Trying to decrypt', res.json().message);
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

  private _generateKeyPair(size:number) {
    this._clientCrypt = new JSEncrypt({default_key_size:size});
    console.log('KEYS', this._clientCrypt.getPrivateKeyB64(), this._clientCrypt.getPublicKeyB64());
  }

  private _getServerPublicKey() {
    this.http.get(clientConfig.keyServer + '/public').take(1).subscribe((res:Response) => {
      let decoded:any = res.json();
      if(decoded.status && decoded.key) {
        this._serverCrypt = new JSEncrypt();
        this._serverCrypt.setKey(decoded.key);
        this.ready.next(true);
      } else {
        throw new Error('Could not contact key server');
      }
    });
  }
}
