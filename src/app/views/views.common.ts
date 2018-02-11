
export abstract class CommonView {


    abstract components
    abstract gridOptions
    abstract modelService
    abstract modalService
    abstract entityService


    abstract entities
    abstract entitiesArray
    abstract entityName
    abstract entityTypeIdentity

    abstract selectedEntity

    abstract subToNavbarFilterByEntity

    abstract refresh()
    //abstract getModalService()

    delete(data, ctx) {
        console.log('delete', data)

        ctx.modelService.deleteById(data.id).then(() => {
            console.log('delete done')
            ctx.refresh()
        })

    }

    edit(data, ctx) {
        const modalRef = ctx.modalService.open(ctx.components.edit, {
            size: "lg"
        });

        modalRef.result.then(
            result => {
                console.log("Closed with :", result);
                //console.log("before ctx.rowData : ", ctx.rowData)
                //ctx.gridOptions.api.redrawRows(result)

                //ctx.rowData.pop();
                //ctx.rowData.push(result)
                //ctx.gridOptions.api.setRowData(ctx.rowData)


                //ctx.gridOptions.api.updateRowData(result)
                //console.log("after ctx.rowData : ", ctx.rowData)
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

        // @ts-ignore: Unreachable code error
        const modalRef = this.modalService.open(this.components.edit, { size: 'lg' })
            .result.then((result) => {
                console.log('Closed with:', result);
                this.refresh();
            }, (reason) => {
                console.log(`Dismissed ${reason}`)
            });
    }

    view(data, ctx) {
        const modalRef = ctx.modalService.open(ctx.components.view, {
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

    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }

    selectAllRows() {
        this.gridOptions.api.selectAll();
    }

    onFilterTextBoxChanged(searchTerm : string = '') {
        this.gridOptions.api.setQuickFilter(searchTerm);
    }

    async loadEntities(ctx) {
        ctx.entities = await ctx.entityService.find({})
        ctx.entitiesArray = []
        ctx.entityName = []
        ctx.entityTypeIdentity = []

        for(let entity of ctx.entities)
        {
            if ( entity.entityTypeIdentity !== undefined ) {
            ctx.entitiesArray.push({ label: entity.name, value: entity.id, entityTypeIdentity: entity.entityTypeIdentity });
            ctx.entityName[entity.id] = entity.name
            ctx.entityTypeIdentity[entity.id] = entity.entityTypeIdentity
            } /* else {
            this.entitiesArray.push({ label: entity.name, value: entity.id });
            this.entityName[entity.id] = entity.name
            } */
        }
    }

    getIdFromNavbar(ctx) {
        ctx.subToNavbarFilterByEntity = ctx.entityService.currentID.subscribe( id => {
            if( id !== undefined ) {
                ctx.selectedEntity = id;
                console.log('selectedEntity from views.common.ts : ', ctx);
                ctx.refresh();
            }
        });
    }

    ngOnInit(ctx) {
        console.log("!!! views.common ngOnInit !!!")
        ctx.loadEntities(ctx).then( () => {
            ctx.getIdFromNavbar(ctx)
        })

    }

    ngOnDestroy(ctx) {
        // unsubscribe to ensure no memory leaks
        console.log("#### views.common ngOnDestroy ####", ctx)
        if(ctx.subToNavbarFilterByEntity) {
            ctx.subToNavbarFilterByEntity.unsubscribe();
        }
    }
}
