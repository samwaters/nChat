import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {FirebaseAuthState} from 'angularfire2';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {WebsocketService} from '../../services/websocket.service';
import {MdDialog} from '@angular/material';
import {SettingsDialogComponent} from '../dialogs/settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public links:Array<any> = [];
  public title:string = 'enChat';
  public theme:string;

  constructor(private dialog:MdDialog, private fbService:FirebaseService, private router:Router, private themeService:ThemeService,  private ws:WebsocketService) {
    this.links = [
      {href:'#', title:'Link 1'},
      {href:'#', title:'Link 2'},
      {href:'#', title:'Link 3'},
    ];
    this.themeService.currentTheme.subscribe((theme:string) => {
      this.theme = theme;
    });

  }

  public get auth():FirebaseAuthState {
    return this.fbService.auth;
  }

  public changeTheme(className:string) {
    this.themeService.changeTheme(className);
  }

  public logOut() {
    this.ws.disconnect();
    this.fbService.logOut();
    this.router.navigate(['/']);
  }

  public showSettingsDialog() {
    this.dialog.open(SettingsDialogComponent, {});
  }

  public get themes():Array<any> {
    return this.themeService.themeList;
  }


  ngOnInit() {
  }

}
