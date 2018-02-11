
import { CustomFormlyService } from './custom-formly.service';
import { FormlyFieldToggle } from './fields/toggle';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyNgFormlyConfig } from './config';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';


@NgModule({
  imports: [
    CommonModule,

    FormlyModule.forRoot(MyNgFormlyConfig),
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [FormlyFieldToggle],
  providers: [CustomFormlyService],
  exports: [
    FormlyBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule

  ]
})
export class CustomFormlyModule { }
