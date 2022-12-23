import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user.component';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { GridModule,PDFModule, ExcelModule, } from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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
export class UserModule { }
