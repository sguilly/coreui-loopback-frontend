import { EntityService } from "../../providers/models/entity.service"
import { UserService } from "../../providers/models/user.service"
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'selector-name',
  templateUrl: 'entity.view.html'
})

export class EntityViewComponent implements OnInit {

  @Input() id;
  entity: any



  constructor(public Entity: EntityService,
  public User: UserService) {


   }

  ngOnInit() {



    Promise.all([
      this.User.load(['id','firstName','lastName']),
    this.Entity.findById(this.id)
  ]).then((values)=>{
    var users = values[0]
    this.entity = values[1]

     if (this.entity.billingContact) {
      let billingContact = this.User.getById(users, this.entity.billingContact);
      this.entity.billingContactName =
        billingContact.firstName + " " + billingContact.lastName;
    }

    if (this.entity.technicalContact) {
      let technicalContact = this.User.getById(users, this.entity.technicalContact);
      this.entity.technicalContactName =
        technicalContact.firstName + " " + technicalContact.lastName;
    }
  })
   }
}
