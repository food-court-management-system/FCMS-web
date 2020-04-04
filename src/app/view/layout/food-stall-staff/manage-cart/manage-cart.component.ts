import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FoodstallStaffService } from 'src/app/service/foodstall-staff.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manage-cart',
  templateUrl: './manage-cart.component.html',
  styleUrls: ['./manage-cart.component.css']
})
export class ManageCartComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  carts;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private foodstallStaffService: FoodstallStaffService) { }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.getAllCartPending();
  }
  getAllCartPending() {
    this.foodstallStaffService.getAllCartPending()
    .subscribe(res => {
      this.carts = res;
      this.dtTrigger.next();
    })
  }

}
