///<reference path="../../assets/jsencrypt.d.ts" />
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {clientConfig} from '../../../config/client.config';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class CryptService {
  private _crypt:JSEncrypt;
  public ready:BehaviorSubject<boolean>;

  constructor(private http:Http) {
    this.ready = new BehaviorSubject<boolean>(false);
    this.http.get(clientConfig.keyServer + '/public').take(1).subscribe((res:Response) => {
      let decoded:any = res.json();
      if(decoded.status && decoded.key) {
        this._crypt = new JSEncrypt();
        this._crypt.setKey(decoded.key);
        this._crypt.setPrivateKey(decoded.key);
        this._crypt.setPublicKey(decoded.key);
        this.ready.next(true);
      } else {
        throw new Error('Could not contact key server');
      }
    });
  }

  public decrypt(text:string):string {
    return this._crypt.decrypt(text);
  }

  public encrypt(text:string):string {
    return this._crypt.encrypt(text);
  }
}
