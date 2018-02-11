import { UserService } from "../../providers/models/user.service"
import { EntityService } from "../../providers/models/entity.service"

import { UserEditComponent } from './user.edit.component';
import { Component } from "@angular/core";
// import { Router } from "@angular/router";

import { GridOptions } from "ag-grid/main";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { CustomGridService } from '../../grid/custom-grid.service';



import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: "user.list.component.html",
  providers: []
})
export class UserListComponent {
  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  entitiesArray: any[];
  selectedEntity: object;



  subToNavbarFilterByEntity: Subscription;

  constructor(
    public Entity: EntityService,
    public User: UserService,
    // private router: Router,
    private modalService: NgbModal,
    private customGridService: CustomGridService)

  {


    //this.selectedEntity = '59ff6689557876281649525e'
    //this.getIdFromNavbar();

    this.gridOptions = <GridOptions>{};

    this.columnDefs = [
      customGridService.icon('edit',this.edit,this),
      customGridService.text('entityName','Entité'),

      customGridService.text("firstName", "Prénom"),
      customGridService.text("lastName", "Nom", ""),
      customGridService.text("address1", "Adresse 1"),
      customGridService.text("address2", "Adresse 2"),
      customGridService.text("address2", "Adresse 2"),
      customGridService.text("zipCode", "Code Postal"),
      customGridService.text("country", "Pays"),
      customGridService.text("email", "Adresse email"),
      customGridService.text("phone", "Téléphone"),

      customGridService.icon('trash',this.delete,this),
    ];

    this.rowData = [];
  }

  delete(data,ctx)
  {
    console.log('delete',data)

    ctx.User.deleteById(data.id).then(()=>{
      console.log('delete done')
      ctx.refresh()
    })

  }

  edit(data,ctx)
  {
    const modalRef = ctx.modalService.open(UserEditComponent, {
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

    const modalRef = this.modalService.open(UserEditComponent,{size: 'lg'})
    .result.then((result) => {
      console.log('Closed with:',result);
      this.refresh();
    }, (reason) => {
      console.log(`Dismissed ${reason}`)
    });
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }

  async refresh() {

    var entities = await this.Entity.find({})

    this.entitiesArray = []
    var entityName = []
    for(let entity of entities)
    {
      this.entitiesArray.push({ label: entity.name, value: entity.id });
      entityName[entity.id] = entity.name
    }

    //var users = await this.User.find({filter:{ where: this.selectedEntity}})
    // var users = await this.User.find({filter:{ where: {entityId: this.selectedEntity}}})
    var users = await this.User.find({filter:{ limit: 10}})
    // 5a743d506e3c08333c7a5d9f

    // .then(users => {
      console.log("users", users);

      this.rowData = []

      for(let user of users)
      {
        user.entityName = entityName[user.entityId] || ''
        this.rowData.push(user);
      }
      if (this.rowData.length > 0) {
        this.gridOptions.api.setRowData(this.rowData);
      }
    // });
  }

  getIdFromNavbar() {
    this.subToNavbarFilterByEntity = this.Entity.currentID.subscribe( id => {
      this.selectedEntity = id
      console.log('selectedEntity from user.list.component : ', this.selectedEntity);
      this.refresh();
    });
  }

  ngOnInit(): void {
    this.getIdFromNavbar();
    // this.refresh();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subToNavbarFilterByEntity.unsubscribe();
  }
}
