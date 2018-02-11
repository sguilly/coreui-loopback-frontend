import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { AppHeaderComponent } from '../src/app/components/app-header/app-header.component';

import { UserListComponent } from '../src/app/views/user/user.list.component';
import { UserEditComponent } from '../src/app/views/user/user.edit.component';

import { CustomFormlyModule } from "../src/app/formly/custom-formly.module";

import * as agGrid from "ag-grid"

import { ViewsModule } from "../src/app/views/views.module";
import { UserModule } from "../src/app/views/user/user.module";
import { ModelsModule } from "../src/app/providers/models/models.module";

import {SelectModule} from 'ng-select';
import { EntitiesSelectorComponent } from '../src/app/selectors/entities-selector.component'


storiesOf('Theme', module)
  .add('AppHeaderComponent', () => ({
    component: AppHeaderComponent,
    props: {

    },
  }))

  // storiesOf('My Button1', module)
  // .add('with some emoji', () => ({
  //   component: MyTestComponent,
  //   props: {
  //     text: '😀 😎 👍 💯',
  //   },
  //   moduleMetadata: {
  //     imports: [ModelsModule,ViewsModule]
  //   }
  // }))

  storiesOf('Entities', module)
  .add('User', () => ({
    component: UserListComponent,
    props: {
      text: '😀 😎 👍 💯',
    },
    moduleMetadata: {
      imports: [ModelsModule,ViewsModule],
      entryComponents: [UserEditComponent],
      declarations: [UserEditComponent]
    }
  }))

  storiesOf('Selectors', module)
  .add('EntitiesSelectorComponent', () => ({
    component: EntitiesSelectorComponent,
    props: {
      id: '59ff6689557876281649525e'
    },
    moduleMetadata: {
      imports: [ModelsModule,SelectModule]
    }
  }))


