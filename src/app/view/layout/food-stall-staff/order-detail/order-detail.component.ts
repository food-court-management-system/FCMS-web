import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FoodstallStaffService } from 'src/app/service/foodstall-staff.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  cartItemId;
  detail;
  ready = false;
  loading = false;
  constructor(private route: ActivatedRoute, private router: Router, private foodstallStaffService: FoodstallStaffService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.cartItemId = params['id'];
          this.getCartItem();
        }
      );
  }

  getCartItem() {
    this.foodstallStaffService.getCartItemDetail(this.cartItemId)
      .subscribe((res) => {
        this.detail = res;
        this.ready = true;
      })
  }

  updateOrderDetail(status) {
    this.loading = true;
    this.foodstallStaffService.updateOrderDetail(this.cartItemId, status)
    .subscribe((res) => {
      this.loading = false;
      this.router.navigate(['/fsstaff/order']);
    })
  }

}
