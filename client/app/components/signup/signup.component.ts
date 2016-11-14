import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {FirebaseAuthState} from 'angularfire2';
import {Router} from '@angular/router';
import {WebsocketService} from '../../services/websocket.service';
import {clientConfig} from '../../../../config/client.config';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public errorMessage:string = '';
  public hasError:boolean = false;
  public recaptchaKey:string;
  public validateForm:Function;
  private _captchaResponse:string = '';
  public formIsValid:BehaviorSubject<boolean>;

  // For the model
  public name:string = '';
  public email:string = '';
  public password:string = '';

  constructor(private fbService:FirebaseService, private router:Router, private ws:WebsocketService) {
    this.formIsValid = new BehaviorSubject<boolean>(false);
    this.recaptchaKey = clientConfig.recaptchaKey;
    this.validateForm = _.throttle(() => {
        this._validateForm();
      }, 250
    );
  }

  public signUp() {
    this.fbService.createUser(this.name, this.email, this.password)
      .then((auth:FirebaseAuthState) => {
        this.ws.connect();
        this.router.navigate(['/chat'])
      }, (err) => {
        this.hasError = true;
        this.errorMessage = err.message;
      });
  }

  ngOnInit() {
  }

  public captchaExpired() {
    this._captchaResponse = '';
    this._validateForm();
  }

  public captchaResponse(response:string) {
    console.log('Captcha response', response);
    this._captchaResponse = response;
    this._validateForm();
  }

  private _validateForm() {
    let emailRegex = /^[A-Za-z0-9_-][A-Za-z0-9_\.-]*(\+[A-Za-z0-9]+)?@([A-Za-z0-9][A-Za-z0-9_-]*\.)*[A-Za-z0-9][A-Za-z0-9_-]{1,62}\.[A-Za-z]{2,3}$/;
    let formValid = this.name !== '' && this.email !== '' && this.password !== '';
    formValid = formValid && this.name.length >= 2 && this.password.length >= 2;
    formValid = formValid && emailRegex.test(this.email);
    formValid = formValid && this._captchaResponse !== '';
    this.formIsValid.next(formValid);
  }
}
