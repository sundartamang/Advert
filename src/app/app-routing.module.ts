import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './core/layout/main/main.component';
import { AuthGuardGuard } from './shared/guards/auth/auth-guard.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },

  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: 'channel',
        loadChildren: () => import("./modules/channel-request/channel-request.module").then(m => m.ChannelRequestModule)
      },
      {
        path: 'advert/:id',
        loadChildren: () => import("./modules/advert/advert.module").then(m => m.AdvertModule)
      },
      {
        path: 'customer',
        loadChildren: () => import("./modules/user/user.module").then(m => m.UserModule)
      }
    ]
  },

  {
    path: 'not-authorized',
    loadChildren: () => import("./modules/error/not-authorized/not-authorized.module").then(m => m.NotAuthorizedModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
