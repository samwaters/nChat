import {Routes, RouterModule} from '@angular/router';
import {ChatComponent} from './components/chat/chat.component';
import {AuthComponent} from './components/auth/auth.component';
import {ChatAuthGuard} from './guards/chat.guard';
const appRoutes:Routes = [
  {
    component:ChatComponent,
    path:'chat',
    canActivate:[ChatAuthGuard]
  },
  {
    component:AuthComponent,
    path:''
  }
];

export const appRoutingProviders:any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
