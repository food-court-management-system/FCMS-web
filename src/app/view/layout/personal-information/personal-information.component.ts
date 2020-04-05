import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  dataUpdate;
  username;
  role: string;
  ready = false;
  loading = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUser.source['_value'];
    if (currentUser && currentUser.username) {
      this.role = currentUser.role;
      this.username = currentUser.username;
      this.getProfile();
    }
  }

  updateProfile() {
    if (!this.validate()) {
      return;
    }
    this.loading = true;
    this.authenticationService.updateProfile(this.dataUpdate)
    .subscribe((res) => {
      this.getProfile();
      this.loading = false;
      this.toastr.success("Update success!");
    })
  }

  validate(): boolean {
    if (this.dataUpdate.firstName == "") {
      this.toastr.error("Fisrtname must not blank!");
      return false;
    }
    if (this.dataUpdate.lastName == "") {
      this.toastr.error("Lastname must not blank!");
      return false;
    }

    if (this.dataUpdate.age == "") {
      this.toastr.error("Age must not blank!");
      return false;
    }
    return true;
  }

  getProfile() {
    this.loading = true;
    this.authenticationService.getProfile(this.username)
    .subscribe(res => {
      this.ready = true;
      this.dataUpdate = {
        username: res.username,
        firstName: res.firstName,
        lastName: res.lastName,
        age: res.age
      }
      this.loading = false;
    });
  }

}
