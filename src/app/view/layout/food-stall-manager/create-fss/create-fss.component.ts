import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';
import {FsmanagerService} from '../../../../service/fsmanager.service';
import {AuthenticationService} from '../../../../service/authentication.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-fss',
  templateUrl: './create-fss.component.html',
  styleUrls: ['./create-fss.component.css']
})
export class CreateFssComponent implements OnInit, CanComponentDeactivate {

  formSubmitted = false;
  fssForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private fsmService: FsmanagerService,
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
    this.fssForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      foodStallId: new FormControl(this.authenticationService.currentUserValue.foodStallId),
      age: new FormControl(0, [Validators.required, Validators.min(18), Validators.max(60)])
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.markControlsAsTouched();
    if (this.fssForm.invalid) {
      this.formSubmitted = false;
      return;
    }
    this.fsmService.createFSS(this.fssForm.value).subscribe((data: any) => {
      // console.log(data);
      // alert('Add new FS staff successfully');
      this.toastr.success('Add new FSS successfully');
      this.router.navigate(['/fsmanager/fss']);
    }, (error) => {
      // console.log(error);
      if (error === 'This username is existed please use another username') {
        this.fssForm.get('username').setErrors({['invalid']: true});
      }
      this.formSubmitted = false;
      this.toastr.error(error);
      // this.catchError.error = data;
      // this.router.navigate(['/error']);
    });
  }

  markControlsAsTouched() {
    Object.keys(this.fssForm.controls).forEach(key => {
      this.fssForm.controls[key].markAsTouched();
    });
  }

  canDeactivate(): boolean {
    if (this.fssForm.dirty && !this.formSubmitted) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
