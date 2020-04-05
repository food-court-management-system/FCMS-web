import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AdminComponent} from './admin/admin.component';
import {CashierComponent} from './cashier/cashier.component';
import {FoodStallManagerComponent} from './food-stall-manager/food-stall-manager.component';
import {AdminGuard} from '../../service/admin.guard';
import {CashierGuard} from '../../service/cashier.guard';
import {FoodstallManagerGuard} from '../../service/foodstall-manager.guard';
import {CreateFsmComponent} from './admin/create-fsm/create-fsm.component';
import {DeleteFsmComponent} from './admin/delete-fsm/delete-fsm.component';
import {CreateCashierComponent} from './admin/create-cashier/create-cashier.component';
import {DeleteCashierComponent} from './admin/delete-cashier/delete-cashier.component';
import {FoodCourtInfoComponent} from './admin/food-court-info/food-court-info.component';
import {ManageFsmComponent} from './admin/manage-fsm/manage-fsm.component';
import {ManageCashierComponent} from './admin/manage-cashier/manage-cashier.component';
import {FoodstallStaffGuard} from '../../service/foodstall-staff.guard';
import {FoodStallStaffComponent} from './food-stall-staff/food-stall-staff.component';
import {CreateFsComponent} from './admin/create-fs/create-fs.component';
import {PersonalInformationComponent} from './personal-information/personal-information.component';
import {ManageFsComponent} from './admin/manage-fs/manage-fs.component';
import { ManageOrderComponent } from './food-stall-staff/manage-order/manage-order.component';
import {ManageFacebookCustomerComponent} from './cashier/manage-facebook-customer/manage-facebook-customer.component';
import {ManageGoogleCustomerComponent} from './cashier/manage-google-customer/manage-google-customer.component';
import {WithdrawComponent} from './cashier/withdraw/withdraw.component';
import {DepositComponent} from './cashier/deposit/deposit.component';
import {ManageFssComponent} from './food-stall-manager/manage-fss/manage-fss.component';
import {CreateFssComponent} from './food-stall-manager/create-fss/create-fss.component';
import { OrderDetailComponent } from './food-stall-staff/order-detail/order-detail.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const layoutRoutes: Routes = [
  { path: '',
    component: LayoutComponent,
    children: [
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
          { path: '' , component: AdminComponent},
          { path: 'fsm', component: ManageFsmComponent},
          { path: 'fsm/create', component: CreateFsmComponent},
          { path: 'fsm/delete', component: DeleteFsmComponent},
          { path: 'cashier', component: ManageCashierComponent},
          { path: 'cashier/create', component: CreateCashierComponent},
          { path: 'cashier/delete', component: DeleteCashierComponent},
          { path: 'foodcourt', component: FoodCourtInfoComponent},
          { path: 'foodstall', component: ManageFsComponent},
          { path: 'foodstall/create', component: CreateFsComponent}
        ] },
      { path: 'cashier', component: CashierComponent, canActivate: [CashierGuard], children: [
          { path: '', component: CashierComponent},
          { path: 'customer', component: ManageFacebookCustomerComponent},
          { path: 'customer/facebook', component: ManageFacebookCustomerComponent},
          { path: 'customer/google', component: ManageGoogleCustomerComponent},
          { path: 'customer/:id/withdraw', component: WithdrawComponent},
          { path: 'customer/:id/deposit', component: DepositComponent}
        ] },
      { path: 'fsmanager', component: FoodStallManagerComponent, canActivate: [FoodstallManagerGuard], children: [
          { path: '', component: FoodStallManagerComponent},
          { path: 'fss', component: ManageFssComponent},
          { path: 'fss/create', component: CreateFssComponent}
        ] },
        { path: 'fsstaff', component: FoodStallStaffComponent, canActivate: [FoodstallStaffGuard],children: [
          { path: '' , component: ManageOrderComponent},
          { path: 'order', component: ManageOrderComponent},
          { path: 'detail/:id', component: OrderDetailComponent},
          ] },
      { path: 'personal-information', component: PersonalInformationComponent },
      { path: 'changepass', component: ChangePasswordComponent }
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(layoutRoutes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
