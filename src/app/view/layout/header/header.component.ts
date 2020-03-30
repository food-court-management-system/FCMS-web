import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  image = 'assets/image/logo.jpg';
  isLogin: boolean = false;
  fname;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // console.log(this.authenticationService.currentUser);
    const currentUser = this.authenticationService.currentUser.source['_value'];
    if (currentUser && currentUser.username) {
      this.isLogin = true;
      this.fname = currentUser.fname;
    }
  }

  getUsername() {
    return this.authenticationService.currentUserValue.username;
  }

  logout() {
    this.isLogin = false;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
