import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-messaging',
  templateUrl: 'messaging.component.html',
  styleUrls: ['messaging.component.css']
})
export class MessagingComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  public get messages():Observable<any> {
    return this.messageService.messages;
  }

  public onSend(message:string) {
    this.messageService.sendMessage(message);
  }


  ngOnInit() {
  }

}
