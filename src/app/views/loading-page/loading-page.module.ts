
import { ViewsModule } from "../views.module";
import { NgModule } from "@angular/core";

import { LoadingPageComponent } from "./loading-page.component";

@NgModule({
  imports: [ViewsModule],
  declarations: [LoadingPageComponent]
})
export class LoadingPageModule {}
