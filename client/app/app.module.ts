// Components
import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component';
import {CaptchaComponent} from './components/captcha/captcha.component';
import {ChatComponent} from './components/chat/chat.component';
import {LoginComponent} from './components/login/login.component';
import {MaterialInputComponent} from './components/input/material-input/material-input.component';
import {MessageComponent} from './components/message/message.component';
import {MessagingComponent} from './components/messaging/messaging.component';
import {MessagingInputComponent} from './components/input/messaging-input/messaging-input.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {SignupComponent} from './components/signup/signup.component';
import {UserComponent} from './components/user/user.component';
import {UsersComponent} from './components/users/users.component';

// Dialogs
import {CryptoDialogComponent} from './components/dialogs/crypto-dialog/crypto-dialog.component';

// Directives
import {FlexDirective, LayoutDirective} from './directives/flex.directive';

// Effects
import {EffectsModule} from '@ngrx/effects';
import {MessageEffects} from './effects/message.effects';
import {UserEffects} from './effects/user.effects';

// Guards
import {ChatAuthGuard} from './guards/chat.guard';

// Modules
import {AngularFireModule} from 'angularfire2';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {StoreModule, combineReducers} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

// Reducers
import {messageReducer} from './reducers/message.reducer';
import {userReducer} from './reducers/user.reducer';

// Services
import {ApiService} from './services/api.service';
import {CaptchaService} from './services/captcha.service';
import {FirebaseService} from './services/firebase.service';
import {MessageService} from './services/message.service';
import {WebsocketService} from './services/websocket.service';
import {ThemeService} from './services/theme.service';
import {UserService} from './services/user.service';

// Other
import {compose} from '@ngrx/core/compose';
import {firebaseConfig, firebaseAuthConfig} from '../../config/firebase.config';
import {routing} from './app.routes';
import {storeLogger} from 'ngrx-store-logger';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CaptchaComponent,
    ChatComponent,
    CryptoDialogComponent,
    FlexDirective,
    LayoutDirective,
    LoginComponent,
    MaterialInputComponent,
    MessagingComponent,
    MessagingInputComponent,
    MessageComponent,
    NavigationComponent,
    SignupComponent,
    UserComponent,
    UsersComponent
  ],
  entryComponents: [
    CryptoDialogComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    BrowserModule,
    EffectsModule.run(MessageEffects),
    EffectsModule.run(UserEffects),
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    StoreModule.provideStore(
      compose(storeLogger(), combineReducers)({messages:messageReducer, users: userReducer})
    )
  ],
  providers: [
    ApiService,
    CaptchaService,
    ChatAuthGuard,
    FirebaseService,
    MessageService,
    ThemeService,
    WebsocketService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
