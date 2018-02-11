import { EntityService } from "../../providers/models/entity.service"
import { UserService } from "../../providers/models/user.service"

import { Router } from "@angular/router";
import { Component, Input } from "@angular/core";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

// formly
import { FormArray, Validators, FormBuilder, FormGroup } from "@angular/forms";
import {FormlyFieldConfig} from '@ngx-formly/core';
import { CustomFormlyService } from "app/formly/custom-formly.service";

@Component({
  templateUrl: "entity.edit.component.html"
})
export class EntityEditComponent {
  @Input() id;

  form: FormGroup;

  fields: Array<FormlyFieldConfig> = [];

  model: object;

  jsonContent: object;

  entityType = [
    {
      value: "producer",
      label: "Fournisseur"
    },
    {
      value: "consumer",
      label: "Consommateur"
    },
    {
      value: "both",
      label: "Fournisseur et Consommateur"
    }
  ];

  entityTypeIdentity = [
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

  constructor(
    public Entity: EntityService,
    public User: UserService,
    fb: FormBuilder,
    private formlyService: CustomFormlyService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {

    this.form = fb.group({});

    this.model = {}

    this.jsonContent = {
      "Array": [1, 2, 3],
      "Boolean": true,
      "Null": null,
      "Number": 123,
      "Object": {"a": "b", "c": "d"},
      "String": "Hello World"
    };
  }

  submit(model) {

    console.log("model", this.model);

    if (this.model && this.model["id"]) {
      this.Entity.updateById(this.model["id"], model).then(entity => {
        console.log("update entity", entity);

        this.activeModal.close(entity);
      });
    } else {

      this.Entity.create(this.model).then(entity => {
        console.log("new entity", entity);

        this.activeModal.close(entity);
      });
    }
  }

  cancel() {
    console.log("add");
    this.activeModal.dismiss();
  }

  async loadForm (){

    console.log('this.id='+this.id)



    var arrayOfUsers = []

    if(this.id)
    {


      var users: any = await this.User.find({filter: {where: {entityId: this.id}}})

       for(let user of users)
      {
        arrayOfUsers.push({
          value: user.id,
          label: (user.firstName ? user.firstName : '') + ' ' +  (user.lastName ? user.lastName : '')
        })
      }

    }



     this.fields = [
      this.formlyService.text("name", "Nom", "", true, {}),
      this.formlyService.text("address1", "Adresse 1", "", true, {}),
      this.formlyService.text("address2", "Adresse 2", "", true, {}),
      this.formlyService.text("zipCode", "Code Postal", "", true, {}),
      this.formlyService.text("country", "Pays", "", true, {}),
      this.formlyService.list(
        "technicalContact",
        "Contact Technique",
        "",
        arrayOfUsers,
        true,
        {}
      ),
      this.formlyService.list(
        "billingContact",
        "Contact de Facturation",
        "",
        arrayOfUsers,
        true,
        {}
      ),
      this.formlyService.list("entityType", "Type", "", this.entityType, true, {}),
      this.formlyService.list("entityTypeIdentity", "Qui je suis ?", "", this.entityTypeIdentity, true, {}),
      this.formlyService.text("externalCode1", "Code Externe 1", "", true, {}),
      this.formlyService.text("externalCode2", "Code Externe 2", "", true, {})
    ];

    if (this.id) {
      this.Entity.findById(this.id).then(entity => {
        this.model = entity;
      });
    }
    else
    {
      this.model = {}
    }
  }

  ngOnInit(): void {
    this.loadForm()
  }
}
