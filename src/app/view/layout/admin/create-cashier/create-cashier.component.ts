import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../dtos/user.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../../../service/admin.service';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';

@Component({
  selector: 'app-create-cashier',
  templateUrl: './create-cashier.component.html',
  styleUrls: ['./create-cashier.component.css']
})
export class CreateCashierComponent implements OnInit, CanComponentDeactivate {

  formSubmitted = false;
  cashierForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private router: Router) {}

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
      username: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      age: new FormControl(0, [Validators.required, Validators.min(18), Validators.max(60)])
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.markControlsAsTouched();
    this.adminService.createNewCashier(this.cashierForm.value).subscribe((data: any) => {
      if (data.code === 200) {
        alert('Add new cashier successfully');
        this.router.navigate(['/admin']);
      } else {
        alert('Something went wrong');
        this.formSubmitted = false;
      }
    }, (error) => {
      console.log(error);
      if (error === 'This username is existed please use another username') {
        alert('Username has already existed. Please try another username')
        this.cashierForm.get('username').hasError('invalid', 'Username has already existed');
      } else {
        alert('Server is off. Please try again later');
      }
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
