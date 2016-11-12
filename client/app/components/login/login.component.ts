import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {WebsocketService} from '../../services/websocket.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  private _auth$:Subscription;
  public errorMessage:string = '';
  public hasError:boolean = false;
  // Models attached to template
  public email:string;
  public password:string;

  constructor(private fbService:FirebaseService, private af:AngularFire, private router:Router, private ws:WebsocketService) {
    this._auth$ = this.af.auth.subscribe((auth:FirebaseAuthState) => {
      // This needs to be a subscription here because the Firebase service might not be ready when this component initializes
      // So it might miss the auth event if it just checked fbService.auth
      if(auth !== null && auth.uid) {
        this.ws.connect();
        this.router.navigate(['/chat']);
      }
    });
  }

  public login() {
    this.fbService.logIn(this.email, this.password)
      .then(() => {
        this.ws.connect();
        this.router.navigate(['/chat']);
      }, (err) => {
        this.hasError = true;
        this.errorMessage = err.message;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._auth$.unsubscribe();
  }
}
