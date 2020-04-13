import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FoodstallStaffService} from '../../../../service/foodstall-staff.service';
import {DataTableDirective} from 'angular-datatables';
import {AuthenticationService} from '../../../../service/authentication.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-order-canceled',
  templateUrl: './order-canceled.component.html',
  styleUrls: ['./order-canceled.component.css']
})
export class OrderCanceledComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  items;
  dtTrigger: Subject<any> = new Subject<any>();
  foodStallId;
  loading = false;

  constructor(private foodstallStaffService: FoodstallStaffService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService) {}

   ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.foodStallId = this.authenticationService.currentUserValue.foodStallId + '';
    this.getAllItemInProcess();
  }
  getAllItemInProcess() {
    this.loading = true;
    this.foodstallStaffService.getAllCanceledItem(this.foodStallId)
      .subscribe(res => {
        this.loading = false;
        this.items = res;
        this.dtTrigger.next();
      }, error => {
        this.toastr.error(error);
        this.loading = false;
      });
  }

}
