import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {FirebaseAuthState} from 'angularfire2';
import {Router} from '@angular/router';
import {WebsocketService} from '../../services/websocket.service';
import {clientConfig} from '../../../../config/client.config';
import {MaterialInputComponent} from '../ui/material-input/material-input.component';

interface IMaterialElementRef extends ElementRef {
  _elementRef?:ElementRef;
  _inputElement?:ElementRef;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public errorMessage:string = '';
  public hasError:boolean = false;
  public recaptchaKey:string;
  @ViewChild('emailfield')
  private _emailField:MaterialInputComponent;
  @ViewChild('passwordfield')
  private _passwordField:MaterialInputComponent;
  @ViewChild('signup')
  private _signup:IMaterialElementRef;

  // For the model
  public captcha:string = '';
  public name:string = '';
  public email:string = '';
  public password:string = '';

  constructor(private fbService:FirebaseService, private router:Router, private ws:WebsocketService) {
    this.recaptchaKey = clientConfig.recaptchaKey;
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
    this.captcha = '';
    this._resetFocus();
  }

  public captchaResponse(response:string) {
    this.captcha = response;
    this._resetFocus();
  }

  private _resetFocus() {
    this._emailField.focus();
    this._passwordField.focus();
    this._signup._elementRef.nativeElement.focus();
  }
}
