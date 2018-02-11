import { UserService } from "../../providers/models/user.service"
import { EntityService } from "../../providers/models/entity.service"

import { Router } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";

// formly
import { FormArray, Validators, FormBuilder, FormGroup } from "@angular/forms";
import {FormlyFieldConfig} from '@ngx-formly/core';

import { CustomFormlyService } from "../../formly/custom-formly.service";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";


@Component({
  templateUrl: "user.edit.component.html"
})
export class UserEditComponent implements OnInit {
  @Input() id;

  form: FormGroup;


  fields: Array<FormlyFieldConfig> = [];

  model: any = {};

  entities: Array<any>;
  selectedEntity: string;

  constructor(
    public Entity: EntityService,
    public User: UserService,
    fb: FormBuilder,
    formlyService: CustomFormlyService,
    public activeModal: NgbActiveModal
  ) {


    this.form = fb.group({});

    this.fields = [
      formlyService.text("login", "Login", "", true, {}),
      formlyService.text("password", "Mot de passe", "", true, {}),
      formlyService.text("firstName", "Prénom", "", true, {}),
      formlyService.text("lastName", "Nom", "", true, {}),
      formlyService.text("address1", "Adresse 1", "", true, {}),
      formlyService.text("address2", "Adresse 2", "", true, {}),
      formlyService.text("address2", "Adresse 2", "", true, {}),
      formlyService.text("zipCode", "Code Postal", "", true, {}),
      formlyService.text("country", "Pays", "", true, {}),
      formlyService.text("email", "Adresse email", "", true, {}),
      formlyService.text("phone", "Téléphone", "", true, {})
    ];
  }

  ngOnInit() {
      if (this.id) {
        this.User.findById(this.id).then(user => {
          this.model = user;
        });
      }
  }

  submit(model) {

    if (model && model["id"]) {
      this.User.updateById(model["id"], model).then(user => {
        console.log("new user", user);

        this.activeModal.close(user);
      });
    } else {
      this.User.create(model).then(user => {
        console.log("new user", user);

        this.activeModal.close(user);
      });
    }
  }

  cancel() {
    console.log("close");
  }
}
