import { Injectable } from "@angular/core";
import { HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable()
export class LoopbackModel {
  tokenClient: any;
  baseUrl: string;
  headers: HttpHeaders;
  model: string;
  rest: any;
  token: string;

  constructor(model: string, tokenClient: any) {
    console.log("loopback model constructor");

    this.baseUrl = tokenClient.getBaseUrl();

    this.tokenClient = tokenClient;

    this.model = model;
    this.rest = tokenClient.http;
  }

  prepareHeader() {
    if (!this.headers) {
      this.headers = new HttpHeaders();

      this.token = this.tokenClient.getToken();
      if (this.token) {
        this.headers = this.headers.append("authorization", this.token);
      }
    }

    return this.headers;
  }

  prepareParams(query: any): HttpParams {
    var params = new HttpParams();

    for (let key of Object.keys(query)) {
      console.log(key);

      params = params.append(key, JSON.stringify(query[key]));
    }
    return params;
  }

  get(url: string, query: any) {
    return new Promise((resolve, reject) => {
      console.log(url, query);
      console.log("headers", this.headers);

      this.rest
        .get(url, {
          headers: this.prepareHeader(),
          params: this.prepareParams(query)
        })
        .subscribe(
          (result: any) => {
            resolve(result);
          },
          (err: any) => {
            reject(err);
          }
        );
    });
  }

  post(url: string, data: any, query = {}) {
    return new Promise((resolve, reject) => {
      console.log(url, data, query);

      this.rest
        .post(url, data, {
          headers: this.prepareHeader(),
          params: this.prepareParams(query)
        })
        .subscribe(
          (result: any) => {
            resolve(result);
          },
          (err: any) => reject(err)
        );
    });
  }

  put(url: string, data: any) {
    return new Promise((resolve, reject) => {
      console.log(url, data);

      this.rest
        .put(url, data, {
          headers: this.prepareHeader()
        })
        .subscribe(
          (result: any) => {
            resolve(result);
          },
          (err: any) => reject(err)
        );
    });
  }

  del(url: string) {
    return new Promise((resolve, reject) => {
      console.log(url);

      this.rest
        .delete(url, {
          headers: this.prepareHeader()
        })
        .subscribe(
          (result: any) => {
            resolve(result);
          },
          (err: any) => reject(err)
        );
    });
  }

  findById(id: string) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.get(url, {});
  }

  create(data: any) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.post(url, data);
  }

  count(where: string) {
    const url = `${this.baseUrl}/${this.model}/count`;
    return this.get(url, where);
  }

  updateAll(query: any, data: any) {
    const url = `${this.baseUrl}/${this.model}/update`;
    return this.post(url, data, query);
  }

  updateById(id: string, data: any) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.put(url, data);
  }

  find(filter: any) {
    const url = `${this.baseUrl}/${this.model}`;
    return this.get(url, filter);
  }

  findOne(query: any) {
    const url = `${this.baseUrl}/${this.model}/findOne`;
    return this.get(url, query);
  }

  deleteById(id: string) {
    const url = `${this.baseUrl}/${this.model}/${id}`;
    return this.del(url);
  }

  remote(name: string, data = {}) {
    const url = `${this.baseUrl}/${this.model}/${name}`;
    return this.post(url, data);
  }

  load(fields: any[]) {
    var query = {
      filter: {
        fields: {}
      }
    };

    for (let field of fields) {
      query.filter.fields[field] = true;
    }

    return this.find(query);
  }

  getById = function(objectArray, idYourAreLookingFor) {
    if (
      idYourAreLookingFor &&
      typeof idYourAreLookingFor === "string" &&
      objectArray
    ) {
      idYourAreLookingFor = idYourAreLookingFor.replace(/[$]/g, "");

      //console.log('idYourAreLookingFor=' + idYourAreLookingFor)

      var elementPos = objectArray
        .map(function(x) {
          return x.id;
        })
        .indexOf(idYourAreLookingFor);

      return objectArray[elementPos];
    } else {
      //log('return cache null')
      return null;
    }
  };
}
