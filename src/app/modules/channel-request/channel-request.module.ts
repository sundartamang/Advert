import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelRequestRoutingModule } from './channel-request-routing.module';
import { ChannelRequestComponent } from './components/channel-request.component';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { GridModule,PDFModule, ExcelModule, } from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";


@NgModule({
  declarations: [ChannelRequestComponent],
  imports: [
    CommonModule,
    ChannelRequestRoutingModule,
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
export class ChannelRequestModule { }
