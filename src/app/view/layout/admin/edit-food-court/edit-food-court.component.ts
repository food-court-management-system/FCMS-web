import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../service/admin.service';

@Component({
  selector: 'app-edit-food-court',
  templateUrl: './edit-food-court.component.html',
  styleUrls: ['./edit-food-court.component.css']
})
export class EditFoodCourtComponent implements OnInit {

  foodCourtName: string;
  foodCourtDescription: string;
  foodCourtAddress: string;
  foodCourtImage: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    // console.log(this.authenticationService.currentUser);
    this.adminService.getInfo().subscribe(data => {
      this.foodCourtAddress = data.foodCourtAddress;
      this.foodCourtName = data.foodCourtName;
      this.foodCourtDescription = data.foodCourtDescription;
      this.foodCourtImage = data.foodCourtImage;
    }, error => {
      alert(error);
    });
  }

}
