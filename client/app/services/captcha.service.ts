import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface ICaptchaWindow {
  captchaOnLoad?:Function;
  grecaptcha?:any;
}

@Injectable()
export class CaptchaService {

  private _inited:boolean;
  private _ready:BehaviorSubject<boolean>;

  constructor() {
    let w:ICaptchaWindow = window;
    this._inited = false;
    this._ready = new BehaviorSubject<boolean>(false);
    w.captchaOnLoad = () => {
      this._scriptLoaded();
    }
  }

  public init():BehaviorSubject<boolean> {
    if(!this._inited) {
      this._inited = true;
      let doc:HTMLElement = document.body;
      let script:HTMLScriptElement = document.createElement('script');
      script.innerHTML = '';
      script.src = 'https://www.google.com/recaptcha/api.js?onload=captchaOnLoad&render=explicit';
      script.async = true;
      script.defer = true;
      doc.appendChild(script);
    }
    return this._ready;
  }

  private _scriptLoaded():void {
    this._ready.next(true);
  }

}
