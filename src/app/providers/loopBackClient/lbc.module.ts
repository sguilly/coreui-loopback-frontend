import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { LoopbackClient } from './lbc.client';


@NgModule({
    imports: [HttpClientModule],
    exports: [],
    providers: [LoopbackClient]
})
export class LbcModule {}
