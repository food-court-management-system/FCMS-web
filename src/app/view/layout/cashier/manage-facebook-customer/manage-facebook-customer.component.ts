import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AllFSManagerDto} from '../../../../dtos/allFSManager.dto';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {AdminService} from '../../../../service/admin.service';
import {CashierService} from '../../../../service/cashier.service';
import {CustomerDto} from '../../../../dtos/customer.dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-facebook-customer',
  templateUrl: './manage-facebook-customer.component.html',
  styleUrls: ['./manage-facebook-customer.component.css']
})
export class ManageFacebookCustomerComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  customers: CustomerDto[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private cashierService: CashierService,
              private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.cashierService.getAllFacebookCustomer().subscribe(customers => {
      this.customers = customers;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onWithdraw(id: any) {
    this.router.navigate([`/cashier/customer/${id}/withdraw`]);
  }

  onDeposit(id: any) {
    this.router.navigate([`/cashier/customer/${id}/deposit`]);
  }

  onBlock(id: any) {
    if (confirm('Do you want to block this customer? He/she will not be able to login and use services.')) {
      // this.cashierService.blockCustomer(id);
    }
  }

  onReactivate(id: any) {
    if (confirm('Do you want to reactivate this customer? He/she will be able to login and user services again.')) {
      // this.cashierService.reactivateCustomer(id);
    }
  }
}
