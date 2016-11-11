import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public links:Array<any> = [];
  public title:string = 'ng2-websocket';
  public theme:string;

  constructor(private themeService:ThemeService) {
    this.links = [
      {href:'#', title:'Link 1'},
      {href:'#', title:'Link 2'},
      {href:'#', title:'Link 3'},
    ]
    this.themeService.currentTheme.subscribe((theme:string) => {
      this.theme = theme;
    })
  }

  public get themes():Array<any> {
    return this.themeService.themeList;
  }

  public changeTheme(className:string) {
    this.themeService.changeTheme(className);
  }


  ngOnInit() {
  }

}
