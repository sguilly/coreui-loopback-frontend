
import { Component, Input, Output, EventEmitter } from "@angular/core";

import { IOption } from "ng-select";

import { EntityService } from "../providers/models/entity.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: "entities-type-selector",
  templateUrl: "entities-type-selector.html"
})
export class EntitiesTypeSelectorComponent {

  entities: any;
  allEntities: any;
  entityTypeIdentity: Array<IOption>;
  type: Array<IOption>;

  subEventDB: Subscription;

  idValueType
  idValue
  @Output() idChange = new EventEmitter();

  @Input()
  get id() {

    console.log('get id')
    return this.idValue;
  }

  set id(val) {
    console.log('set id')
    this.idValue = val;
    this.idChange.emit(this.idValue);
  }

  onSelected(option: IOption) {
    console.log('option',option)
    console.log(" **********************je passe dans onSelected() ***************");
    localStorage.navbarSelectedEntity = option.value;
    this.id = option.value;
    if (this.id === "-1") {
      this.pushFilterEntitiesByType(localStorage.navbarSelectedType);

    } else {
      this.pushFilterEntitiesById(this.id);
    }
  }

  onSelectedType(option: IOption) {
    // console.log('onSelectedType option',option);
    // console.log('onSelectedType allEntities', this.allEntities);
    if (option.value != '') {

      this.filterEntitiesByType(option.value);
      localStorage.navbarSelectedType = option.value;

      console.log(" **********************je passe dans onSelectedType() ***************");

      // init navbarSelectedEntity
      this.idValue= "-1";
      localStorage.navbarSelectedEntity = "-1";
      // this.pushFilterEntitiesByType(option.value)
      // this.pushNoFilter();
    }

  }

  constructor(
    private entityService: EntityService,
  ){
    this.entityTypeIdentity = [
      {
        value: "transporter",
        label: "Transporteur"
      },
      {
        value: "renter",
        label: "Loueur"
      },
      {
        value: "partner",
        label: "Partenaire"
      },
      {
        value: "originator",
        label: "Donneur d'ordre"
      }
    ];
  }

  getSubscribeTosubEventDB() {
    this.subEventDB = this.entityService.getBehavior().subscribe( event => {
      console.log('event on DB : ', event);
      this.init();
    });
  }

  ngOnInit() {
    this.getSubscribeTosubEventDB();
    // this.init();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    console.log("ngOnDestroy");
    this.subEventDB.unsubscribe();
  }

  init() {
    console.log("INIT");
    this.entityService.currentID.subscribe(id => {
      console.log("debug : id : ", id);

      if (id === undefined) {
        // you pass here when the observable start
      } else if (id.entityTypeIdentity) {
        this.idValueType = id.entityTypeIdentity;
      } else if (id.entityId) {
        this.idValue = id.entityId;
      }
      /*
       if('entityTypeIdentity' in id) {
         this.idValueType = id['entityTypeIdentity'];
       } else if ('entityId' in id) {
         this.idValue = id['entityId'];
       } */
    });
    this.entityService.find({}).then(entities => {
      this.entities = [];
      this.allEntities = [];

      for (let entity of entities) {

        // attention ici à changer
        // il faut vérifier que la propriété existe sinon au pourra pas appliquer le filtre
        if ( entity.entityTypeIdentity != undefined) {
          this.allEntities.push({ label: entity.name, value: entity.id, entityTypeIdentity: entity.entityTypeIdentity  });
        }
      }

      this.entities = this.allEntities;
      this.entities = [ { label: "Tous", value: "-1"}, ...this.entities];

      if (localStorage.navbarSelectedType) {
        console.log("init : localStorage.navbarSelectedType : ", localStorage.navbarSelectedType)
        this.idValueType = localStorage.navbarSelectedType;
      } else {
        localStorage.navbarSelectedType = 'transporter';
        this.idValueType = localStorage.navbarSelectedType;
      }
      this.filterEntitiesByType(this.idValueType);

      if (localStorage.navbarSelectedEntity) {
        console.log("init : localStorage.navbarSelectedEntity : ", localStorage.navbarSelectedEntity)
        this.idValue = localStorage.navbarSelectedEntity;
        this.pushFilterEntitiesById(this.idValue);
      } else {
        localStorage.navbarSelectedEntity = "-1";
        this.idValue = localStorage.navbarSelectedType;
      }

    });
  }

  filterEntitiesByType(value) {
    this.entities = this.allEntities.filter( e => e.entityTypeIdentity.toLowerCase().includes(value));
    this.entities = [ { label: "Tous", value: "-1"}, ...this.entities];
    this.pushFilterEntitiesByType(value);

    // change Entity selected to all
    localStorage.navbarSelectedEntity = "-1";
    this.idValue = "-1";
  }

  pushFilterEntitiesById(idEntity: string) {
    if (idEntity !== "-1") {
      console.log("je passe ?, idEntity : ", idEntity)
      this.entityService.changeID({ entityId: idEntity });
    }
  }

  pushFilterEntitiesByType(idType: string) {
      this.entityService.changeID({ entityTypeIdentity: idType });
  }

  pushNoFilter() {
    this.entityService.changeID({});
  }
}
