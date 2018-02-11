import { CustomGridService } from './custom-grid.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from "ag-grid-angular";


@NgModule({
  imports: [
    AgGridModule.withComponents([])
  ],
  declarations: [],
  providers: [
    CustomGridService
  ],
  exports: [
    AgGridModule

  ]
})
export class CustomGridModule {}
