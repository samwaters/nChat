import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService:UserService) {
    this.userService.requestUserList();
  }

  public get users():Observable<any> {
    return this.userService.users;
  }

  ngOnInit() {
  }

}
