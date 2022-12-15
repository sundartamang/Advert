import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertRoutingModule } from './advert-routing.module';
import { AdvertComponent } from './components/advert.component';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { GridModule,PDFModule, ExcelModule, } from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";



@NgModule({
  declarations: [AdvertComponent],
  imports: [
    CommonModule,
    AdvertRoutingModule,
    GridModule,
    ButtonsModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    PDFExportModule,
    PDFModule,
    ExcelModule
  ]
})
export class AdvertModule { }
