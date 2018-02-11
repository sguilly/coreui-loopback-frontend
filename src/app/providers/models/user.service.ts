import { Injectable } from '@angular/core';

import { ModelService } from './model.service'


@Injectable()
export class UserService extends ModelService {

constructor() {
        super('user')
    }

    whoami(){
      return this.remote('whoami')
  }

  login(email,password) {
    return this.lbc.login(email,password)
  }


}
