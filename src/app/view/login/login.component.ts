import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService) {
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
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (!this.validate()) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        (error: any) => {
          this.toastr.error(error);
          this.loading = false;
        });
  }

  validate(): boolean {
    const data = this.loginForm.value;
    if (data.username == "") {
      this.toastr.error("Username must not blank!");
      return false;
    }
    if (data.password == "") {
      this.toastr.error("Password must not blank!");
      return false;
    }
    if (data.password.length < 5 || data.password.length > 16) {
      this.toastr.error("Password must have 5-16 characters");
      return false;
    }
    return true;
  }

}