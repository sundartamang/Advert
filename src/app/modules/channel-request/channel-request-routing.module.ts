import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelRequestComponent } from './components/channel-request.component';


const routes: Routes = [
  {
    path : '',
    component: ChannelRequestComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelRequestRoutingModule { }
