import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../service/admin.service';
import {FsmanagerService} from '../../../../service/fsmanager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../service/authentication.service';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-food-court',
  templateUrl: './edit-food-court.component.html',
  styleUrls: ['./edit-food-court.component.css']
})
export class EditFoodCourtComponent implements OnInit, CanComponentDeactivate {
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  isChangeImage = false;

  formSubmitted = false;
  fcEditForm: FormGroup;

  foodCourtName: string;
  foodCourtDescription: string;
  foodCourtAddress: string;
  foodCourtImage: string;
  loading = false;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    // console.log(this.authenticationService.currentUser);
    // this.adminService.getInfo().subscribe(data => {
    //   this.foodCourtAddress = data.foodCourtAddress;
    //   this.foodCourtName = data.foodCourtName;
    //   this.foodCourtDescription = data.foodCourtDescription;
    //   this.foodCourtImage = data.foodCourtImage;
    // }, error => {
    //   // alert(error);
    //   this.toastr.error(error);
    // });
    this.createForm();
  }

  onClear() {
    this.createForm();
  }

  createForm() {
    this.loading = true;
    this.adminService.getInfo().subscribe(data => {
      this.foodCourtAddress = data.foodCourtAddress;
      this.foodCourtName = data.foodCourtName;
      this.foodCourtDescription = data.foodCourtDescription;
      this.foodCourtImage = data.foodCourtImage;
      this.fcEditForm = new FormGroup({
        foodCourtName: new FormControl(data.foodCourtName, [Validators.required, Validators.maxLength(50)]),
        foodCourtDescription: new FormControl(data.foodCourtDescription, [Validators.required, Validators.maxLength(1000)]),
        foodCourtAddress: new FormControl(data.foodCourtAddress, [Validators.required, Validators.maxLength(100)]),
      });
      this.loading = false;
    }, error => {
      // alert(error);
      this.loading = false;
      this.toastr.error(error);
    });
    this.fcEditForm = new FormGroup({
      foodCourtName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      foodCourtDescription: new FormControl(null, [Validators.required, Validators.maxLength(1000)]),
      foodCourtAddress: new FormControl(null, [Validators.required, Validators.maxLength(50)])
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit() {
    if (this.fcEditForm.invalid) {
      this.markControlsAsTouched();
      return;
    }
    this.formSubmitted = true;
    this.loading = true;
    const formData = new FormData();
    if (this.fileData !== null) {
      formData.append('image', this.fileData);
    }
    formData.append('foodCourtName', this.fcEditForm.controls.foodCourtName.value);
    formData.append('foodCourtDescription', this.fcEditForm.controls.foodCourtDescription.value);
    formData.append('foodCourtAddress', this.fcEditForm.controls.foodCourtAddress.value);
    this.adminService.updateFC(formData).subscribe(data => {
      // alert('Update FC information successfully');
      this.loading = false;
      this.toastr.success('Update FC information successfully');
      this.router.navigate(['/fsmanager/fs']);
    }, error => {
      this.loading = false;
      this.formSubmitted = false;
      this.toastr.error(error);
      // alert(error);
    });
  }
  //
  // ngOnDestroy(): void {
  //   for (const sub of this.subscriptions) {
  //     sub.unsubscribe();
  //   }
  // }

  markControlsAsTouched() {
    Object.keys(this.fcEditForm.controls).forEach(key => {
      this.fcEditForm.controls[key].markAsTouched();
    });
  }

  canDeactivate(): boolean {
    if (this.fcEditForm.dirty && !this.formSubmitted) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  onUpdateImage() {
    this.isChangeImage = true;
  }

}
