import { Injectable } from "@angular/core";
import * as _ from "lodash";

import * as moment from "moment"

@Injectable()
export class CustomGridService {
  defaultWidth = 80;

  constructor() {}

  text = function(
    field: string,
    name: string,
    width?: string,
    objectToMerge?: any
  ) {
    return _.merge(
      {
        headerName: name,
        field: field,
        width: width ? width : this.defaultWidth,
        enableRowGroup: true,
        enablePivot: true,
        floatCell: true,

        filterParams: {
          cellHeight: 20,
          newRowsAction: "keep",
          selectAllOnMiniFilter: true,
          clearButton: true
        }
      },
      objectToMerge
    );
  };

  icon = function(icon: string, fn: any, ctx?: any) {
    return {
      headerName: "",
      
      cellRenderer: params => {
        var eDiv = document.createElement("div");

        eDiv.innerHTML = '<i class="fa fa-' + icon + ' gi-2x"></i>';
        var eButton = eDiv.querySelectorAll(".fa-" + icon)[0];

        eButton.addEventListener("click", () => {
          fn(params.data, ctx);
        });

        return eDiv;
      },
      width: 21,
      minWidth: 21,
      maxWidth: 21,
      suppressResize: true,
      suppressSizeToFit: true,
      suppressMovable: true,
      suppressFilter: true,
      suppressSorting: true
    };
  };

  state = function(field: string, name: string, fn?: any, ctx?: any, width?: string) {
    return {
      headerName: name,
      field: field,
      width: width ? width : this.defaultWidth,
      enableRowGroup: true,
      enablePivot: true,
      floatCell: true,

      filterParams: {
        cellHeight: 20,
        newRowsAction: "keep",
        selectAllOnMiniFilter: true,
        clearButton: true
      },
      cellRenderer: params => {
        var eDiv: any = document.createElement("div");
        //eDiv.id = name;
        eDiv.style.textAlign = "center";
        let switchState = ['yes', 'no', 'undefined'];
 
        console.log("params.value : ", params.value)

        eDiv = this.createIconDependingOnState(params.value, eDiv);
        //var eButton = eDiv.querySelectorAll(".fa-" + "close")[0];

        console.log('field : ', field);

        //addEventListener("dblclick",
        // dblclick ne marche pas !!!!
        eDiv.addEventListener('dblclick', () => {
           console.log("iCON double click");
           console.log('addEventListener : params.data : ', params.data);
           console.log("addEventListener : params.value : ", params.value)
           console.log('addEventListener : ctx : ', ctx);

           let index = switchState.indexOf(params.data[field]);
           index++;
           if (index === 3) {
             index = 0;
           }
           fn(params.data, switchState[index], field, ctx);
        });

        return eDiv;
      }
    };
  };

  createIconDependingOnState(state, HTMLelement) {
    let IconAndColor = {
      colorIcon: '',
      icon: ''
    }
    if (state === 'yes') {
      IconAndColor.colorIcon = 'text-success';
      IconAndColor.icon = 'check';
    } else if (state === 'no') {
      IconAndColor.colorIcon = 'text-danger';
      IconAndColor.icon = 'close';
    } else if (state === 'undefined') {
      IconAndColor.colorIcon = 'text-secondary';
      IconAndColor.icon = 'question';
    }
    HTMLelement.innerHTML = '<span class="' + IconAndColor.colorIcon + ' fa fa-' + IconAndColor.icon + ' gi-2x" ></span>';
    return HTMLelement;
  }

  textWithTooltip = function(field: string, name, width?, objectToMerge?) {
    return _.merge(
      {
        headerName: name,
        cellRenderer: params => {
          var eDiv = document.createElement("div");

          if (params.value) {
            eDiv.innerHTML =
              '<span data-toggle="tooltip" title="' +
              params.value +
              '">' +
              params.value +
              "</span>";
          } else {
            eDiv.innerHTML = "";
          }

          return eDiv;
        },
        field: field,
        width: width ? width : this.defaultWidth,
        enableRowGroup: true,
        enablePivot: true,
        floatCell: true,

        filterParams: {
          //cellRenderer: CountryCellRenderer,
          cellHeight: 20,
          newRowsAction: "keep",
          selectAllOnMiniFilter: true,
          clearButton: true
        }
      },
      objectToMerge
    );
  };

  date = function(field, name, width?, objectToMerge?)  {
      return _.merge({
              headerName: name,
              field: field,
              width: width ? width : this.defaultWidth,
              enableRowGroup: true,

              filter: "date",
              valueFormatter: this.formatDate
          },
          objectToMerge)
  }

  formatDate = function(params) {

      return params.value ? moment(params.value).format('DD/MM/YYYY HH:mm:ss') : null
  }

  hour = function(field, name, width?, objectToMerge?) {
      return _.merge({
              headerName: name,
              field: field,
              width: width ? width : this.defaultWidth,
              enableRowGroup: true,

              filter: "date",
              valueFormatter: this.formatHour
          },
          objectToMerge)
  }

  formatHour = function(params) {

      return params.value ? moment(params.value).format('HH:mm') : null
  }

  number = function(field, name, width?, objectToMerge?) {
      return _.merge({
              headerName: name,
              field: field,
              width: width ? width : this.defaultWidth,
              filter: "number"
          },
          objectToMerge)
  }

  currency = function(field, name, width?, objectToMerge?) {
      return _.merge({
              headerName: name,
              field: field,
              width: width ? width : this.defaultWidth,
              filter: "number",
              valueFormatter: this.formatCurrency
          },
          objectToMerge)
  }

  formatCurrency = function(params) {

      return params.value ? params.value + ' €' : null
  }

  pourcentage = function(field, name, width?, objectToMerge?) {
    return _.merge({
            headerName: name,
            field: field,
            width: width ? width : this.defaultWidth,
            filter: "number",
            valueFormatter: this.formatPourcentage
        },
        objectToMerge)
}

formatPourcentage = function(params) {

    return params.value ? params.value + ' %' : null
}

  bool = function(field, name, width?, objectToMerge?) {
      return _.merge({
              headerName: name,
              field: field,
              width: width ? width : this.defaultWidth,
              valueFormatter: this.formatBool,

          },
          objectToMerge)
  }

  formatBool = function(params) {

      if (params.value === true) {
          return 'OUI'
      } else if (params.value === false) {
          return 'NON'
      } else {
          return
      }

  }
}
