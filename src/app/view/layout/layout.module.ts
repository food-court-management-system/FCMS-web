import {FoodStallManagerComponent} from './food-stall-manager/food-stall-manager.component';
import {AdminComponent} from './admin/admin.component';
import {NgModule} from '@angular/core';
import {CashierComponent} from './cashier/cashier.component';
import {MenuComponent} from './menu/menu.component';
import {LayoutComponent} from './layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {CommonModule} from '@angular/common';
import {AdminGuard} from '../../service/admin.guard';
import {CashierGuard} from '../../service/cashier.guard';
import {FoodstallManagerGuard} from '../../service/foodstall-manager.guard';
import { FoodCourtInfoComponent } from './admin/food-court-info/food-court-info.component';
import { CreateCashierComponent } from './admin/create-cashier/create-cashier.component';
import { DeleteCashierComponent } from './admin/delete-cashier/delete-cashier.component';
import { DeleteFsmComponent } from './admin/delete-fsm/delete-fsm.component';
import { CreateFsmComponent } from './admin/create-fsm/create-fsm.component';
import { ManageFsmComponent } from './admin/manage-fsm/manage-fsm.component';
import { ManageCashierComponent } from './admin/manage-cashier/manage-cashier.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { HeaderComponent } from './header/header.component';
import { FoodStallStaffComponent } from './food-stall-staff/food-stall-staff.component';
import {FoodstallStaffGuard} from '../../service/foodstall-staff.guard';
import { CreateFsComponent } from './admin/create-fs/create-fs.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ManageFsComponent } from './admin/manage-fs/manage-fs.component';
import { ManageOrderComponent } from './food-stall-staff/manage-order/manage-order.component';
import { ManageFssComponent } from './food-stall-manager/manage-fss/manage-fss.component';
import { CreateFssComponent } from './food-stall-manager/create-fss/create-fss.component';
import { ManageFacebookCustomerComponent } from './cashier/manage-facebook-customer/manage-facebook-customer.component';
import { ManageGoogleCustomerComponent } from './cashier/manage-google-customer/manage-google-customer.component';
import { WithdrawComponent } from './cashier/withdraw/withdraw.component';
import { DepositComponent } from './cashier/deposit/deposit.component';
import { OrderDetailComponent } from './food-stall-staff/order-detail/order-detail.component';
import { NgxLoadingModule } from 'ngx-loading';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    AdminComponent,
    FoodStallManagerComponent,
    CashierComponent,
    FoodCourtInfoComponent,
    CreateCashierComponent,
    DeleteCashierComponent,
    DeleteFsmComponent,
    CreateFsmComponent,
    ManageFsmComponent,
    ManageCashierComponent,
    HeaderComponent,
    FoodStallStaffComponent,
    CreateFsComponent,
    PersonalInformationComponent,
    ManageFsComponent,
    ManageOrderComponent,
    ManageFssComponent,
    CreateFssComponent,
    ManageFacebookCustomerComponent,
    ManageGoogleCustomerComponent,
    WithdrawComponent,
    DepositComponent,
    OrderDetailComponent,
    ChangePasswordComponent
  ],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    AdminGuard,
    CashierGuard,
    FoodstallManagerGuard,
    FoodstallStaffGuard
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
