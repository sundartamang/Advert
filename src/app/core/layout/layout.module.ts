import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { TopbarComponent } from './main/topbar/topbar.component';



@NgModule({
  declarations: [MainComponent, TopbarComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
