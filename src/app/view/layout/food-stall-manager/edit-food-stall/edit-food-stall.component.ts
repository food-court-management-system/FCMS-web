import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FsmanagerService} from '../../../../service/fsmanager.service';
import {FoodEntityDto} from '../../../../dtos/food-entity.dto';
import {FoodTypeEntityDto} from '../../../../dtos/food-type-entity.dto';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-food-stall',
  templateUrl: './edit-food-stall.component.html',
  styleUrls: ['./edit-food-stall.component.css']
})
export class EditFoodStallComponent implements OnInit, CanComponentDeactivate {
  fsId: number;
  fsName: string;
  fsDescription: string;
  fsRating: number;
  fsImage: string;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  foodID: number;
  isChangeImage = false;

  formSubmitted = false;
  fsEditForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private fsmService: FsmanagerService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.formSubmitted = false;
    this.createForm();
  }


  onClear() {
    this.createForm();
  }

  createForm() {
    this.fsmService.getInfo(this.authenticationService.currentUserValue.foodStallId).subscribe(data => {
      this.fsId = data.foodStallId;
      this.fsName = data.foodStallName;
      this.fsDescription = data.foodStallDescription;
      this.fsRating = data.foodStallRating;
      this.fsImage = data.foodStallImage;
      this.fsEditForm = new FormGroup({
        fsName: new FormControl(data.foodStallName, [Validators.required, Validators.maxLength(50)]),
        fsDescription: new FormControl(data.foodStallDescription, [Validators.required, Validators.maxLength(1000)])
      });
    }, error => {
      // alert(error);
      this.toastr.error(error);
    });
    this.fsEditForm = new FormGroup({
      fsName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      fsDescription: new FormControl(null, [Validators.required, Validators.maxLength(1000)])
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
    this.markControlsAsTouched()
    if (this.fsEditForm.invalid) {
      return;
    }
    this.formSubmitted = true;
    const formData = new FormData();
    if (this.fileData !== null) {
      formData.append('image', this.fileData);
    }
    formData.append('foodStallName', this.fsEditForm.controls.fsName.value);
    formData.append('foodStallDescription', this.fsEditForm.controls.fsDescription.value);
    this.fsmService.updateFS(this.authenticationService.currentUserValue.foodStallId, formData).subscribe(data => {
      // alert('Update FS information successfully');
      this.toastr.success('Update FS information successfully');
      this.router.navigate(['/fsmanager/fs']);
    }, error => {
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
    Object.keys(this.fsEditForm.controls).forEach(key => {
      this.fsEditForm.controls[key].markAsTouched();
    });
  }

  canDeactivate(): boolean {
    if (this.fsEditForm.dirty && !this.formSubmitted) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  onUpdateImage() {
    this.isChangeImage = true;
  }
}
