import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FoodstallStaffService } from 'src/app/service/foodstall-staff.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  items;
  dtTrigger: Subject<any> = new Subject<any>();
  foodStallId;
  loading = false;

  constructor(private foodstallStaffService: FoodstallStaffService, private authenticationService: AuthenticationService, private router: Router) { }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.foodStallId = this.authenticationService.currentUserValue.foodStallId + "";
    this.getAllItemInProcess();
  }
  getAllItemInProcess() {
    this.loading = true;
    this.foodstallStaffService.getAllItemInProcess(this.foodStallId)
    .subscribe(res => {
      this.loading = false;
      this.items = res;
      this.dtTrigger.next();
    })
  }

  onAction(cartItemId) {
    this.router.navigate([`/fsstaff/detail/${cartItemId}`]);
  }
}
