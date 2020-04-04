import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../../service/admin.service';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';
import {FoodStallDto} from '../../../../dtos/foodStall.dto';

@Component({
  selector: 'app-create-fsm',
  templateUrl: './create-fsm.component.html',
  styleUrls: ['./create-fsm.component.css']
})
export class CreateFsmComponent implements OnInit, CanComponentDeactivate {

  formSubmitted = false;
  fsmForm: FormGroup;
  fss: FoodStallDto[];

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
    this.adminService.getAllFS().subscribe(data => {
      this.fss = data;
      this.fsmForm.get('foodStallId').setValue(this.fss[0].foodStallId);
    }, error => {
      alert(error);
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
    this.formSubmitted = true;
    this.markControlsAsTouched();
    this.adminService.createNewFsm(this.fsmForm.value).subscribe((data: any) => {
      console.log(data);
      alert('Create new FS Manager successfully');
      this.router.navigate(['/admin/fsm']);
    }, (error) => {
      console.log(error);
      if (error === 'This username is existed please use another username') {
        this.fsmForm.get('username').setErrors({['invalid']: true});
      }
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
