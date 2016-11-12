import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {FirebaseAuthState} from 'angularfire2';
import {Router} from '@angular/router';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public errorMessage:string = '';
  public hasError:boolean = false;
  // For the model
  public name:string = '';
  public email:string = '';
  public password:string = '';

  constructor(private fbService:FirebaseService, private router:Router, private ws:WebsocketService) {}

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

}
