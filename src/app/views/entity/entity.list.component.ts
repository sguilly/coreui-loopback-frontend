import { EntityViewComponent } from './entity.view.component';
import { forEach } from "@angular/router/src/utils/collection";

import { EntityEditComponent } from "./entity.edit.component";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { GridOptions } from "ag-grid/main";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CustomGridService } from "app/grid/custom-grid.service";

import { EntityService } from "../../providers/models/entity.service"
import { UserService } from "../../providers/models/user.service"

import { CommonView } from "../views.common"

@Component({
  templateUrl: "entity.list.component.html",
  providers: []
})
export class EntityListComponent {
  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  searchTerm: string;

  constructor(
    public entityService: EntityService,
    public userService: UserService,
    private router: Router,
    public modalService: NgbModal,
    private customGridService: CustomGridService
  ) {

    console.log('start')

    this.gridOptions = <GridOptions>{};

    this.columnDefs = [
      customGridService.icon("edit", this.edit, this),
      customGridService.icon("eye", this.view, this),
      customGridService.text("name", "Nom"),
      customGridService.text("address1", "Addresse 1"),
      customGridService.text("address2", "Addresse 2"),
      customGridService.text("zipCode", "Code Postal"),
      customGridService.text("city", "Ville"),
      customGridService.text("country", "Pays"),
      customGridService.text("technicalContactName", "Contact technique"),
      customGridService.text("billingContactName", "Contact Facturation"),
      customGridService.text("entityType", "Type"),

      customGridService.icon("trash", this.delete, this)
    ];

    this.rowData = [];
  }

  delete(data, ctx) {
    console.log("delete", data);

    ctx.entityService.deleteById(data.id).then(() => {
      ctx.refresh();
    });
  }

  edit(data, ctx) {
    const modalRef = ctx.modalService.open(EntityEditComponent, {
      size: "lg"
    });

    modalRef.result.then(
      result => {
        console.log("Closed with:", result);
        ctx.refresh();
      },
      reason => {
        console.log(`Dismissed ${reason}`);
      }
    );

    modalRef.componentInstance.id = data.id;
  }

  view(data, ctx) {
    const modalRef = ctx.modalService.open(EntityViewComponent, {
      size: "lg"
    });

    modalRef.result.then(
      result => {
        console.log("Closed with:", result);
        ctx.refresh();
      },
      reason => {
        console.log(`Dismissed ${reason}`);
      }
    );

    modalRef.componentInstance.id = data.id;
  }

  add() {
    console.log("add");

    // this.router.navigate(["/entity/edit"]);

    const modalRef = this.modalService.open(EntityEditComponent, {
      size: "lg"
    });

    modalRef.result.then(
      result => {
        console.log("Closed with:", result);
        this.refresh();
      },
      reason => {
        console.log(`Dismissed ${reason}`);
      }
    );
  } 
  
  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }

  onFilterTextBoxChanged(searchTerm : string = '') {
    this.gridOptions.api.setQuickFilter(searchTerm);
  }

  refresh() {

    console.log('refresh')


    Promise.all([
      this.userService.load(["id", "firstName", "lastName"]),
      this.entityService.find({})
    ]).then(values => {
      var users = values[0];
      var entities = values[1];

      this.rowData = [];

      for (let entity of entities) {
        if (entity.billingContact) {
          let billingContact = this.userService.getById(users, entity.billingContact);
          entity.billingContactName =
            billingContact.firstName + " " + billingContact.lastName;
        }

        if (entity.technicalContact) {
          let technicalContact = this.userService.getById(users, entity.technicalContact);
          entity.technicalContactName =
            technicalContact.firstName + " " + technicalContact.lastName;
        }

        this.rowData.push(entity);
      }
      
      try {
        this.gridOptions.api.setRowData(this.rowData);
      } catch (error) {
        console.error("error :", error)
        this.refresh
      }
    });
  }

  ngOnInit(): void {
    this.refresh();
  }
}
