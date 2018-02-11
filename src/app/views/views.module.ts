import { CustomGridModule } from '../grid/custom-grid.module';
import { CustomFormlyModule } from "../formly/custom-formly.module";

import { NgModule } from "@angular/core";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FillHeightModule } from '../directives/ngx-fill-height/fill-height.module';


// import { NgbDateFRParserFormatter } from "./custom-ng-boostrap/ngb-date-fr-parser-formatter"

// import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

// import {SelectModule} from 'ng-select';

// import { SelectorsModule } from 'app/selectors/selectors.module';

import { CommonModule } from '@angular/common';



@NgModule({
  imports: [CommonModule, /*SelectModule,*/ CustomGridModule, CustomFormlyModule,NgbModule.forRoot(),FillHeightModule],
  exports: [/*SelectModule,*/ CustomFormlyModule, CustomGridModule, NgbModule,FillHeightModule/*, SelectorsModule*/],

  // providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ViewsModule {}
