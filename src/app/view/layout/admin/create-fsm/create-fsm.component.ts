import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../../service/admin.service';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';
import {FoodStallDto} from '../../../../dtos/foodStall.dto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-fsm',
  templateUrl: './create-fsm.component.html',
  styleUrls: ['./create-fsm.component.css']
})
export class CreateFsmComponent implements OnInit, CanComponentDeactivate {

  formSubmitted = false;
  fsmForm: FormGroup;
  fss: FoodStallDto[];
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
    this.loading = true;
    this.adminService.getAllFS().subscribe(data => {
      this.fss = data;
      this.fsmForm.get('foodStallId').setValue(this.fss[0].foodStallId);
      this.loading = false;
    }, error => {
      // alert(error);
      this.toastr.error(error);
      this.loading = false;
    })
    this.fsmForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      age: new FormControl(0, [Validators.required, Validators.min(18), Validators.max(60)]),
      foodStallId: new FormControl(null)
    });
  }

  onSubmit() {
    this.markControlsAsTouched();
    if (this.fsmForm.invalid) {
      return;
    }
    this.formSubmitted = true;
    this.loading = true;
    this.adminService.createNewFsm(this.fsmForm.value).subscribe((data: any) => {
      // alert('Create new FS Manager successfully');
      this.loading = false;
      this.toastr.success('Create new FS Manager successfully');
      this.router.navigate(['/admin/fsm']);
    }, (error) => {
      if (error === 'This username is existed please use another username') {
        this.formSubmitted = false;
        this.fsmForm.get('username').setErrors({['invalid']: true});
      }
      this.toastr.error(error);
      this.loading = false;
      // this.catchError.error = data;
      // this.router.navigate(['/error']);
    });
  }

  markControlsAsTouched() {
    Object.keys(this.fsmForm.controls).forEach(key => {
      this.fsmForm.controls[key].markAsTouched();
    });
  }

  canDeactivate(): boolean {
    if (this.fsmForm.dirty && !this.formSubmitted) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
