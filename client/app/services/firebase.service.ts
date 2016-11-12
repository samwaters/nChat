import { Injectable } from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import * as firebase from 'firebase';
import Promise = firebase.Promise;

@Injectable()
export class FirebaseService {
  public auth:FirebaseAuthState = null;

  constructor(private af:AngularFire) {
    af.auth.subscribe((auth:FirebaseAuthState) => {
      this.auth = auth;
    });
  }

  public createUser(name:string, email:string, password:string):Promise<FirebaseAuthState> {
    return this.af.auth.createUser({
      email:email,
      password:password
    });
  }

  public logIn(email:string, password:string):Promise<FirebaseAuthState> {
    return this.af.auth.login({
      email: email,
      password: password
    });
  }

  public logOut() {
    this.af.auth.logout();
  }

}
