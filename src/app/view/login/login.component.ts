import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  userData;
  usernameError = false;
  passwordError = false;
  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      if (this.authenticationService.currentUserValue.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (this.authenticationService.currentUserValue.role === 'cashier') {
        this.router.navigate(['/cashier']);
      } else if (this.authenticationService.currentUserValue.role === 'fsmanager') {
        this.router.navigate(['/fsmanager']);
      } else {
        this.router.navigate(['/fsstaff']);
      }
    }
  }

  ngOnInit() {
    this.userData = {
      username: '',
      password: ''
    };

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    if (this.userData.username.length < 5 || this.userData.username.length > 16) {
      this.usernameError = true;
    }
    if (this.userData.password.length < 5 || this.userData.password.length > 16) {
      this.passwordError = true;
    }
    if (this.usernameError || this.passwordError) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.userData)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        (error: any) => {
          alert(error);
          this.loading = false;
        });
  }

}
