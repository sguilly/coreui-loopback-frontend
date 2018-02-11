import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../providers/models/user.service'

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {

    this.userService.whoami().then((value)=>{
      console.log('whoaim=',value)
      this.router.navigate(['dashboard']);
    }).catch ((error)=> {
      console.log('error',error)
      //this.router.navigate(['login']);
      this.router.navigate(['dashboard']);
    })


  }

}
