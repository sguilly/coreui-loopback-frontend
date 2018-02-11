import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../providers/models/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent implements OnInit {

  model: any = {};
  constructor(private router: Router,private userService: UserService) { }

  ngOnInit() {
  }

  login() {

    console.log('login',this.model)

    this.userService.login(this.model.email, this.model.password)
    .then((value)=>{
      console.log('login=',value)
      this.router.navigate(['dashboard']);
    })



  }

}
