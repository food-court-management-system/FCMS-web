import {FoodStallComponent} from './food-stall/food-stall.component';
import {AdminComponent} from './admin/admin.component';
import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {CashierComponent} from './cashier/cashier.component';
import {MenuComponent} from './menu/menu.component';
import {LayoutComponent} from './layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    AdminComponent,
    FoodStallComponent,
    CashierComponent
  ],
  imports: [
    LayoutRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
