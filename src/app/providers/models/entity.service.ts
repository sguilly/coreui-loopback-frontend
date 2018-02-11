import { Injectable } from '@angular/core';

import { ModelService } from './model.service'

import { Subscription } from 'rxjs/Subscription';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class EntityService extends ModelService {

  private IDentitySelected = new BehaviorSubject<idNavbar>(undefined);
  currentID = this.IDentitySelected.asObservable();

    constructor() {
        super('entity')
    }

    changeID(id: idNavbar) {
        this.IDentitySelected.next(id)
    }

}

export interface idNavbar {
    entityTypeIdentity?: string,
    entityId?: string
  }



