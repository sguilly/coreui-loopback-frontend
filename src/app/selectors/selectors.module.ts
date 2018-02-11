

import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import {SelectModule} from 'ng-select';

import { EntitiesTypeSelectorComponent } from "./entities-type-selector.component";
import { EntitiesSelectorComponent } from './entities-selector.component'


@NgModule({
  declarations: [EntitiesTypeSelectorComponent, EntitiesSelectorComponent],
  imports: [FormsModule, SelectModule],
  exports: [EntitiesTypeSelectorComponent, EntitiesSelectorComponent]
})
export class SelectorsModule {}
