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
          { path: 'foodstall', component: CreateFsComponent}
        ] },
      { path: 'cashier', component: CashierComponent, canActivate: [CashierGuard] },
      { path: 'fsmanager', component: FoodStallManagerComponent, canActivate: [FoodstallManagerGuard] },
      { path: 'fsstaff', component: FoodStallStaffComponent, canActivate: [FoodstallStaffGuard] }
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(layoutRoutes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
