import { Injectable } from "@angular/core";
import * as _ from "lodash";

@Injectable()
export class CustomFormlyService {
  constructor() {}

  bool = function(
    key,
    label,
    placeholder = "",
    required = false,
    objectToMerge = {}
  ) {
    return _.merge(
      {
        key: key,
        type: "checkbox",

        templateOptions: {
          label: label,
          placeholder: placeholder,
          required: required
        },
        validation: {
          show: true,
        }
      },
      objectToMerge
    );
  };

  text = function(
    key,
    label,
    placeholder = "",
    required = false,
    objectToMerge = {}
  ) {
    return _.merge(
      {
        key: key,
        type: "input",

        templateOptions: {
          label: label,
          placeholder: placeholder,
          required: required
        },
        validation: {
          show: true,
        }
      },
      objectToMerge
    );
  };

  list = function(
    key,
    label,
    placeholder = "",
    options,
    required = false,
    objectToMerge = {}
  ) {
    return _.merge(
      {
        key: key,
        type: "select",

        templateOptions: {
          options: options,
          label: label,
          placeholder: placeholder,
          required: required
        }
      },
      objectToMerge
    );
  };


}
