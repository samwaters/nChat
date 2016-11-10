import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-messaging-input',
  templateUrl: './messaging-input.component.html',
  styleUrls: ['./messaging-input.component.css']
})
export class MessagingInputComponent implements OnInit {
  @Output() send: EventEmitter<any> = new EventEmitter();
  public currentMessage:string;

  constructor() { }

  public sendMessage() {
    this.send.emit(this.currentMessage);
    this.currentMessage = '';
  }

  ngOnInit() {
  }

}
