import { Injectable } from '@angular/core';

import { LoopbackClient } from "../../providers/loopBackClient/lbc.client";

// Rxjs
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {AppInjector} from './model.injector';

import { HttpClient } from "@angular/common/http";



export class ModelService {

    Model: any

    DBevent: BehaviorSubject<string>;

    nameService

    lbc: any

    constructor(
        private name: string

    ) {
        console.log('create model for '+name)
        this.nameService = name;

        this.lbc = AppInjector.get(LoopbackClient);

        this.Model = this.lbc.getModel(name);

    }

    getBehavior() {
      if(!this.DBevent)
      {
        this.DBevent = new BehaviorSubject<string>('Observable : init DBevent');
      }

      return this.DBevent.asObservable();

    }

    changeDB(value: string) {
      console.log("changeDB :", value)
      this.DBevent.next(value);
    }

    find(filter:any){
        return this.Model.find(filter)
    }

    findById(data: any) {
        return this.Model.findById(data)
    }

    create(data: any) {
      let modelCreateData = this.Model.create(data)
      if(this.DBevent) {
        this.changeDB("create")
      }
      return modelCreateData;
    }

    count(where: string) {
      return this.Model.count(where)
    }

    updateAll(query: any, data: any) {
      return this.Model.updateAll(query,data)
    }

    updateById(id: string, data: any) {
      return this.Model.updateById(id,data)
    }


    findOne(query: any) {
      return this.Model.findOne(query)
    }

    deleteById(id: string) {
      let modelDeleteById = this.Model.deleteById(id)
      if(this.DBevent) {
        this.changeDB("delete")
      }
      return modelDeleteById
    }

    remote(name: string, data = {}) {
      return this.Model.remote(name,data)
    }

    load(fields: any[]) {
      var query = {
        filter: {
          fields: {}
        }
      };

      for (let field of fields) {
        query.filter.fields[field] = true;
      }

      return this.Model.find(query);
    }

    getById = function(objectArray, idYourAreLookingFor) {
      if (
        idYourAreLookingFor &&
        typeof idYourAreLookingFor === "string" &&
        objectArray
      ) {
        idYourAreLookingFor = idYourAreLookingFor.replace(/[$]/g, "");

        //console.log('idYourAreLookingFor=' + idYourAreLookingFor)

        var elementPos = objectArray
          .map(function(x) {
            return x.id;
          })
          .indexOf(idYourAreLookingFor);

        return objectArray[elementPos];
      } else {
        //log('return cache null')
        return null;
      }
    };
}
