import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../service/admin.service';
import {FsmanagerService} from '../../../../service/fsmanager.service';
import {AuthenticationService} from '../../../../service/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-food-stall-information',
  templateUrl: './food-stall-information.component.html',
  styleUrls: ['./food-stall-information.component.css']
})
export class FoodStallInformationComponent implements OnInit {

  fsId: number;
  fsName: string;
  fsDescription: string;
  fsRating: number;
  fsImage: string;

  constructor(private fsmService: FsmanagerService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    // console.log(this.authenticationService.currentUser);
    this.fsmService.getInfo(this.authenticationService.currentUserValue.foodStallId).subscribe(data => {
      this.fsId = data.foodStallId;
      this.fsName = data.foodStallName;
      this.fsDescription = data.foodStallDescription;
      this.fsRating = data.foodStallRating;
      this.fsImage = data.foodStallImage;
    }, error => {
      // alert(error);
      this.toastr.error(error);
    });
  }

  onEditInfo() {
    this.router.navigate(['/fsmanager/fs/edit']);
  }
}
