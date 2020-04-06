import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from '../../../../service/admin.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FsmanagerService} from '../../../../service/fsmanager.service';
import {AuthenticationService} from '../../../../service/authentication.service';
import {FoodEntityDto} from '../../../../dtos/food-entity.dto';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';
import {Subscription} from 'rxjs';
import {FoodTypeEntityDto} from '../../../../dtos/food-type-entity.dto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-and-edit-food.component.html',
  styleUrls: ['./create-and-edit-food.component.css']
})
export class CreateAndEditFoodComponent implements OnInit, CanComponentDeactivate {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  foodID: number;
  editMode = false;
  foodDTO: FoodEntityDto;
  types: FoodTypeEntityDto[];
  isSale = false;

  formSubmitted = false;
  foodForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private fsmService: FsmanagerService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.formSubmitted = false;
    this.createForm();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.foodID = +params['id'];
          this.editMode = !!params['id'];
          if (this.editMode) {
            this.updateForm();
          }
        }
      );
  }

  updateForm() {
    this.fsmService.getFoodInfo(this.authenticationService.currentUserValue.foodStallId, this.foodID).subscribe(data => {
      this.foodDTO = data;
      this.isSale = true;
      this.previewUrl = data.foodImage;
      this.foodForm = new FormGroup({
        foodName: new FormControl(this.foodDTO.foodName, [Validators.required, Validators.maxLength(50)]),
        originPrice: new FormControl(this.foodDTO.originPrice, [Validators.required, Validators.min(1000)]),
        retailPrice: new FormControl(this.foodDTO.retailPrice, [Validators.required, Validators.min(1000)]),
        foodType: new FormControl(this.foodDTO.foodType.typeName),
        foodDescription: new FormControl(this.foodDTO.foodDescription, [Validators.required, Validators.maxLength(1000)])
      });
    }, error => {
      // alert(error);
      this.toastr.error(error);
    });
  }

  onClear() {
    this.createForm();
  }

  createForm() {
    this.fsmService.getAllFoodTypes().subscribe(data => {
      this.types = data;
      this.foodForm.get('foodType').setValue(this.types[0].typeName);
    }, error => {
      this.toastr.error(error);
    });
    this.foodForm = new FormGroup({
      foodName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      originPrice: new FormControl(1000, [Validators.required, Validators.min(1000)]),
      retailPrice: new FormControl(1000, [Validators.required, Validators.min(1000)]),
      foodType: new FormControl(null),
      foodDescription: new FormControl(null, [Validators.required, Validators.maxLength(1000)])
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
    if (this.foodForm.invalid) {
      this.markControlsAsTouched();
      return;
    }
    if (this.foodForm.get('retailPrice').value > this.foodForm.get('originPrice').value) {
      this.foodForm.get('retailPrice').setErrors({['invalid']: true});
      return;
    }
    this.formSubmitted = true;
    const formData = new FormData();
    if (this.fileData !== null) {
      formData.append('image', this.fileData);
    }
    formData.append('foodName', this.foodForm.controls.foodName.value);
    formData.append('foodDescription', this.foodForm.controls.foodDescription.value);
    formData.append('originPrice', this.foodForm.controls.originPrice.value);
    formData.append('foodType', this.foodForm.controls.foodType.value);
    if (!this.editMode) {
      if (this.isSale === true) {
        formData.append('retailPrice', this.foodForm.controls.retailPrice.value);
      } else {
        formData.append('retailPrice', this.foodForm.controls.originPrice.value);
      }
      this.fsmService.createNewFood(this.authenticationService.currentUserValue.foodStallId, formData).subscribe(data => {
        // alert('Create new food successfully');
        this.toastr.success('Create new food successfully');
        this.router.navigate(['/fsmanager/food']);
      }, error => {
        // alert(error);
        this.formSubmitted = false;
        this.toastr.error(error);
      });
    } else {
      formData.append('retailPrice', this.foodForm.controls.retailPrice.value);
      this.fsmService.updateFood(this.authenticationService.currentUserValue.foodStallId, this.foodID, formData).subscribe(data => {
        // alert('Update food successfully');
        this.toastr.success('Update food successfully');
        this.router.navigate(['fsmanager/food']);
      }, error => {
        this.formSubmitted = false;
        this.toastr.error(error);
      });
    }
  }
  //
  // ngOnDestroy(): void {
  //   for (const sub of this.subscriptions) {
  //     sub.unsubscribe();
  //   }
  // }

  markControlsAsTouched() {
    Object.keys(this.foodForm.controls).forEach(key => {
      this.foodForm.controls[key].markAsTouched();
    });
  }

  canDeactivate(): boolean {
    if (this.foodForm.dirty && !this.formSubmitted) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  onSale() {
    this.isSale = true;
  }
}
