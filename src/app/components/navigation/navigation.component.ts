import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public links:Array<any> = [];
  public title:string = 'ng2-websocket';
  constructor() {
    this.links = [
      {href:'#', title:'Link 1'},
      {href:'#', title:'Link 2'},
      {href:'#', title:'Link 3'},
    ]
  }

  ngOnInit() {
  }

}
