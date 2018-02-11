import { ViewsModule } from "../views.module";
import { NgModule } from "@angular/core";

import { UserEditComponent } from "./user.edit.component";
import { UserListComponent } from "./user.list.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  imports: [UserRoutingModule, ViewsModule],
  declarations: [UserEditComponent, UserListComponent],
  exports: [UserEditComponent, UserListComponent]
})
export class UserModule {}
