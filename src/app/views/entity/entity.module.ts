import { ViewsModule } from "../views.module";
import { NgModule } from "@angular/core";

import { EntityEditComponent } from "./entity.edit.component";
import { EntityListComponent } from "./entity.list.component";
import { EntityRoutingModule } from "./entity-routing.module";
import { EntityViewComponent } from "./entity.view.component";
import { JSONEditorComponent } from "./json-editor.component"


@NgModule({
  imports: [EntityRoutingModule, ViewsModule],
  declarations: [EntityEditComponent, EntityViewComponent, EntityListComponent, JSONEditorComponent]
})
export class EntityModule {}
