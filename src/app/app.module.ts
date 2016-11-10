import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import {UserService} from './services/user.service';
import {WebsocketService} from './services/websocket.service';
import {MaterialModule} from '@angular/material';
import {StoreModule, combineReducers} from '@ngrx/store';
import {storeLogger} from 'ngrx-store-logger';
import {userReducer} from './reducers/user.reducer';
import {compose} from '@ngrx/core/compose';
import {FlexDirective, LayoutDirective} from './directives/flex.directive';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavigationComponent,
    MessagingComponent,
    FlexDirective,
    LayoutDirective,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore(
      compose(storeLogger(), combineReducers)({users: userReducer})
    )
  ],
  providers: [UserService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
