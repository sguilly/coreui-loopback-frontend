import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { LoopbackModel } from "./lbc.model";

@Injectable()
export class LoopbackClient {
  baseUrl = "http://app.xxx.com/api";

  token: string;
  headers = {};

  constructor(public http: HttpClient) {
    console.log("loopback client");

    if (
      window.location.href.indexOf("localhost") != -1 ||
      window.location.href.indexOf("192.168") != -1
    ) {
      // en local
      this.baseUrl = "http://localhost:13000/api";

    }


    var token = localStorage.getItem("loopBackClientToken")
      if (token) {
        this.token = token;
      }
    ;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  setToken(token: string) {
    console.log("set token =", token);
    this.token = token;
    localStorage.setItem("loopBackClientToken", this.token);
  }

  getToken() {
    // console.log("get token=", this.token);
    return this.token;
  }

  getModel(name: string) {
    console.log("name", name);
    return new LoopbackModel(name, this);
  }

  login(email: string, password: string): Promise<any> {
    console.log("in login");

    const data = {
      email: email,
      password: password
    };

    return new Promise(resolve => {
      this.http
        .post(this.baseUrl + "/user/login?include=user", data)
        .subscribe(data => {
          this.token = (data as any).id;

          localStorage.setItem("loopBackClientToken", this.token);
          resolve(data);
        });
    });
  }
}
