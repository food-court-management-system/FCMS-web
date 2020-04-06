import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username;
  dataUpdate;
  ready = false;
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUser.source['_value'];
    if (currentUser && currentUser.username) {
      this.dataUpdate = {
        username: currentUser.username,
        oldPassword: '',
        newPassword: ''
      }
      this.ready = true;
    }
  }

  changePassword() {
    if (!this.validate()) {
      return;
    }
    this.authenticationService.changePassword(this.dataUpdate)
    .subscribe(res => {
      this.router.navigateByUrl('/personal-information');
    }, error => {
      this.toastr.error(error);
    });
  }

  validate(): boolean {
    if (this.dataUpdate.oldPassword === '') {
      this.toastr.error('Current password must not blank!');
      return false;
    }
    if (this.dataUpdate.newPassword === '') {
      this.toastr.error('New password must not blank!');
      return false;
    }
    if (this.dataUpdate.oldPassword.length < 5 || this.dataUpdate.oldPassword.length > 16) {
      this.toastr.error('Current password must have 5-16 characters');
      return false;
    }
    if (this.dataUpdate.newPassword.length < 5 || this.dataUpdate.newPassword.length > 16) {
      this.toastr.error('New password must have 5-16 characters');
      return false;
    }
    return true;
  }

}
