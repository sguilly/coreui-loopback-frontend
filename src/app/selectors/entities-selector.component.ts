
import { Component, Input, Output, EventEmitter } from "@angular/core";

import { IOption } from "ng-select";

import { EntityService } from "../providers/models/entity.service"

@Component({
  selector: "entities-selector",
  template: `

  <ng-select [options]="entities" [(ngModel)]="idValue" (selected)="onSelected($event)">
  </ng-select>`
})
export class EntitiesSelectorComponent {

  entities: Array<IOption>;

  idValue
  @Output() idChange = new EventEmitter();

  @Input()
  get id() {

    console.log('get id=',this.idValue)
    return this.idValue;
  }

  set id(val) {
    console.log('set id=',val)
    this.idValue = val;
    this.idChange.emit(this.idValue);
  }

  onSelected(option: IOption) {
    console.log('option=',option)

    this.idValue = option.value
    // this.Entity.changeID(this.idValue);
  }

  constructor(
    private Entity: EntityService
  ) {

  }

  ngOnInit() {

    this.Entity.find({}).then(entities => {
      this.entities = [];

      for (let entity of entities) {
        this.entities.push({ label: entity.name, value: entity.id });
      }

      this.Entity.currentID.subscribe(idValue => {
        console.log('subscribe=',idValue)

        if(idValue)
        {
          this.idValue = idValue
        }

      });

      console.log('read this=',this.idValue)

    });
  }
}
