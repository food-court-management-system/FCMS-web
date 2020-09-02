import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../dtos/user.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../../service/admin.service';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-cashier',
  templateUrl: './create-cashier.component.html',
  styleUrls: ['./create-cashier.component.css']
})
export class CreateCashierComponent implements OnInit, CanComponentDeactivate {

  formSubmitted = false;
  cashierForm: FormGroup;
  loading = false;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.formSubmitted = false;
    this.createForm();
  }

  onClear() {
    // this.router.navigate(['/projects']);
    this.createForm();
  }

  createForm() {
    this.cashierForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      age: new FormControl(0, [Validators.required, Validators.min(1900)])
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.markControlsAsTouched();
    if (this.cashierForm.invalid) {
      this.formSubmitted = false;
      return;
    }
    this.loading = true;
    this.adminService.createNewCashier(this.cashierForm.value).subscribe((data: any) => {
      this.loading = false;
      this.toastr.success('Create new cashier successfully');
      this.router.navigate(['/admin/cashier']);
    }, (error) => {
      if (error === 'This username is existed please use another username') {
        this.cashierForm.get('username').setErrors({['invalid']: true});
      }
      this.loading = false;
      this.toastr.error(error);
      this.formSubmitted = false;
      // this.catchError.error = data;
      // this.router.navigate(['/error']);
    });
  }

  markControlsAsTouched() {
    Object.keys(this.cashierForm.controls).forEach(key => {
      this.cashierForm.controls[key].markAsTouched();
    });
  }

  canDeactivate(): boolean {
    if (this.cashierForm.dirty && !this.formSubmitted) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
