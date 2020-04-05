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
import { ManageCartComponent } from './food-stall-staff/manage-cart/manage-cart.component';
import { ManageFssComponent } from './food-stall-manager/manage-fss/manage-fss.component';
import { CreateFssComponent } from './food-stall-manager/create-fss/create-fss.component';
import { ManageFacebookCustomerComponent } from './cashier/manage-facebook-customer/manage-facebook-customer.component';
import { ManageGoogleCustomerComponent } from './cashier/manage-google-customer/manage-google-customer.component';
import { WithdrawComponent } from './cashier/withdraw/withdraw.component';
import { DepositComponent } from './cashier/deposit/deposit.component';
import { FoodStallInformationComponent } from './food-stall-manager/food-stall-information/food-stall-information.component';
import { ManageFoodComponent } from './food-stall-manager/manage-food/manage-food.component';
import { CreateAndEditFoodComponent } from './food-stall-manager/create-and-edit-food/create-and-edit-food.component';
import { EditFoodStallComponent } from './food-stall-manager/edit-food-stall/edit-food-stall.component';

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
    ManageCartComponent,
    ManageFssComponent,
    CreateFssComponent,
    ManageFacebookCustomerComponent,
    ManageGoogleCustomerComponent,
    WithdrawComponent,
    DepositComponent,
    FoodStallInformationComponent,
    ManageFoodComponent,
    CreateAndEditFoodComponent,
    EditFoodStallComponent
  ],
  imports: [
    LayoutRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
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
