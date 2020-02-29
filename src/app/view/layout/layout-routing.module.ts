import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AdminComponent} from './admin/admin.component';
import {CashierComponent} from './cashier/cashier.component';
import {FoodStallComponent} from './food-stall/food-stall.component';
import {MenuComponent} from './menu/menu.component';
// import {MenuComponent} from "./menu/menu.component";

const layoutRoutes: Routes = [
  { path: '',
    component: LayoutComponent,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'cashier', component: CashierComponent },
      { path: 'foodstall', component: FoodStallComponent }
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(layoutRoutes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
