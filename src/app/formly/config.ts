import { Validators } from '@angular/forms';
import { ConfigOption, Field } from '@ngx-formly/core';

import { FormlyFieldToggle } from './fields/toggle';


export const MyNgFormlyConfig: any = {
  types: [
    { name: 'toggle', component: FormlyFieldToggle, defaultOptions: { templateOptions: { isAlert: false, isLarge: true }}},
  ],

};

