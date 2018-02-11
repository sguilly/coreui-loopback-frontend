import { NgModule } from "@angular/core";

import { LbcModule } from "../loopBackClient/lbc.module";

import { EntityService } from "./entity.service";

import { UserService } from "./user.service";

import { Injector } from "@angular/core";
import { setAppInjector } from "./model.injector";

@NgModule({
  imports: [LbcModule],
  exports: [],
  providers: [
    EntityService,
    UserService,
  ]
})
export class ModelsModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
