import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CustomerDto} from '../../../../dtos/customer.dto';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {CashierService} from '../../../../service/cashier.service';
import {CustomerStatusDto} from '../../../../dtos/customer-status.dto';

@Component({
  selector: 'app-manage-google-customer',
  templateUrl: './manage-google-customer.component.html',
  styleUrls: ['./manage-google-customer.component.css']
})
export class ManageGoogleCustomerComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  customers: CustomerDto[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  dto: CustomerStatusDto;
  loading = false;

  constructor(private cashierService: CashierService,
              private router: Router) { }

  ngOnInit(): void {
    this.dto = new CustomerStatusDto();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.loading = true;
    this.cashierService.getAllGoogleCustomer().subscribe(customers => {
      this.loading = false;
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
      this.loading = true;
      this.dto.customerId = id;
      this.dto.status = false;
      this.cashierService.blockOrReactivateUser(this.dto).subscribe( data => {
        this.cashierService.getAllGoogleCustomer().subscribe(customers => {
          this.loading = false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.customers = customers;
            this.dtTrigger.next();
          });
        });
      }, error => {
        alert(error);
      });
    }
  }

  onReactivate(id: any) {
    if (confirm('Do you want to reactivate this customer? He/she will be able to login and user services again.')) {
      this.loading = true;
      this.dto.customerId = id;
      this.dto.status = true;
      this.cashierService.blockOrReactivateUser(this.dto).subscribe( data => {
        this.cashierService.getAllGoogleCustomer().subscribe(customers => {
          this.loading = false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.customers = customers;
            this.dtTrigger.next();
          });
        });
      }, error => {
        alert(error);
      });
    }
  }

}
