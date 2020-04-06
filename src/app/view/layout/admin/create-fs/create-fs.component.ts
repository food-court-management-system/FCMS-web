import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../service/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-fs',
  templateUrl: './create-fs.component.html',
  styleUrls: ['./create-fs.component.css']
})
export class CreateFsComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  formSubmitted = false;
  fsForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private router: Router) { }

  ngOnInit() {
    this.formSubmitted = false;
    this.createForm();
  }

  onClear() {
    this.createForm();
  }

  createForm() {
    // chưa có image
    this.fsForm = new FormGroup({
      foodStallName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      foodStallDescription: new FormControl(null, [Validators.required, Validators.maxLength(1000)])
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

  markControlsAsTouched() {
    Object.keys(this.fsForm.controls).forEach(key => {
      this.fsForm.controls[key].markAsTouched();
    });
  }

  onSubmit() {
    this.markControlsAsTouched();
    if (this.fsForm.invalid) {
      return;
    }
    if (this.fileData === null) {
      alert('Please choose an image');
      return;
    }
    const formData = new FormData();
    formData.append('foodStallName', this.fsForm.controls.foodStallName.value);
    formData.append('foodStallDescription', this.fsForm.controls.foodStallDescription.value);
    formData.append('image', this.fileData);
    this.adminService.createNewFoodStall(formData)
    .subscribe((res) => {
        // console.log(res);
        // this.uploadedFilePath = res.data.filePath;
        alert('Create new food stall successfully');
        this.router.navigate(['/admin/foodstall']);
    },
    (error) => {
      console.log(error);
    });
  }

}
