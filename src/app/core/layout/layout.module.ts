import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { TopbarComponent } from './main/topbar/topbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MainComponent, TopbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule { }
