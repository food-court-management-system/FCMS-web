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

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.currentUser) {
      this.isLogin = true;
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
