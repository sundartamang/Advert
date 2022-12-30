import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'channel',
    loadChildren: () => import("./modules/channel-request/channel-request.module").then(m => m.ChannelRequestModule)
  },
  {
    path: 'advert/:id',
    loadChildren: () => import("./modules/advert/advert.module").then(m => m.AdvertModule)
  },
  {
    path: 'user',
    loadChildren: () => import("./modules/user/user.module").then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
