import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  onLogin() {
    const userInfo = {
      username : 'abc',
      password : 'abc'
    };
    this.authenticationService.checkLogin(userInfo).subscribe((data) => {}, (error) => {});
  }

}
