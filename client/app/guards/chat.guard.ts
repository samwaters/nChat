import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Injectable()
export class ChatAuthGuard implements CanActivate {
  constructor(private fbService:FirebaseService, private router:Router) {}

  public canActivate():boolean {
    if(this.fbService.auth === null) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
