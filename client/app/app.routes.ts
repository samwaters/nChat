import {Routes, RouterModule} from '@angular/router';
import {ChatComponent} from './components/chat/chat.component';
import {AuthComponent} from './components/auth/auth.component';
const appRoutes:Routes = [
  {
    component:ChatComponent,
    path:'chat',
    canActivate:[]
  },
  {
    component:AuthComponent,
    path:''
  }
];

export const appRoutingProviders:any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
