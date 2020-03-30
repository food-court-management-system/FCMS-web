import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  fname: string;
  age: string;
  userId: string;
  lname: string;
  username: string;
  role: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // console.log(this.authenticationService.currentUser);
    const currentUser = this.authenticationService.currentUser.source['_value'];
    if (currentUser && currentUser.username) {
      this.fname = currentUser.fname;
      this.lname = currentUser.lname;
      this.age = currentUser.age;
      this.userId = currentUser.userId;
      this.role = currentUser.role;
      this.username = currentUser.username;
    }
  }

}
