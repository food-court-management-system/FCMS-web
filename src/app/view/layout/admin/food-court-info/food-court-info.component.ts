import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication.service';
import {Router} from '@angular/router';
import {AdminService} from '../../../../service/admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-food-court-info',
  templateUrl: './food-court-info.component.html',
  styleUrls: ['./food-court-info.component.css']
})
export class FoodCourtInfoComponent implements OnInit {

  foodCourtName: string;
  foodCourtDescription: string;
  foodCourtAddress: string;
  foodCourtImage: string;
  loading = false;

  constructor(private adminService: AdminService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = true;
    // console.log(this.authenticationService.currentUser);
    this.adminService.getInfo().subscribe(data => {
      this.foodCourtAddress = data.foodCourtAddress;
      this.foodCourtName = data.foodCourtName;
      this.foodCourtDescription = data.foodCourtDescription;
      this.foodCourtImage = data.foodCourtImage;
      this.loading = false;
    }, error => {
      // alert(error);
      this.toastr.error(error);
      this.loading = false;
    });
  }

  onEditFCInfo() {
    this.router.navigate(['/admin/foodcourt/edit']);
  }
}
