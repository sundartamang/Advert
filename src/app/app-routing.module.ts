import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./modules/advert/advert.module").then(m => m.AdvertModule)
  },
  {
    path: 'request-channerl/:id',
    loadChildren: () => import("./modules/channel-request/channel-request.module").then(m => m.ChannelRequestModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
