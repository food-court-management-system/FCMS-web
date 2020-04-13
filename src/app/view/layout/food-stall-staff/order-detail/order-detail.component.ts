import {Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FoodstallStaffService } from 'src/app/service/foodstall-staff.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @ViewChild('modalCancel', { static: false }) modalCancel: TemplateRef<any>;
  @ViewChild('vc', { static: true, read: ViewContainerRef }) vc: ViewContainerRef;
  backdrop: any;
  cartItemId;
  detail;
  ready = false;
  loading = false;
  reasonForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private foodstallStaffService: FoodstallStaffService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.cartItemId = params['id'];
          this.getCartItem();
        }
      );
    this.reasonForm = new FormGroup({
      id: new FormControl(this.cartItemId),
      reason: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    });
  }

  showDialog() {
    const view = this.modalCancel.createEmbeddedView(null);
    this.vc.insert(view);
    this.modalCancel.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modalCancel.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modalCancel.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV')
    this.backdrop.className = 'modal-backdrop in';
    document.body.appendChild(this.backdrop);
  }

  closeDialog() {
    this.vc.clear();
    document.body.removeChild(this.backdrop);
  }

  getCartItem() {
    this.foodstallStaffService.getCartItemDetail(this.cartItemId)
      .subscribe((res) => {
        this.detail = res;
        this.ready = true;
      });
  }

  updateOrderDetail(status) {
    this.loading = true;
    // if (status === 'CANCEL') {
    //   var data = new Object();
    //   data.id = this.cartItemId;
    //   data.reason =
    //   this.foodstallStaffService.cancelOrderDetail({})
    // }
    this.foodstallStaffService.updateOrderDetail(this.cartItemId, status)
    .subscribe((res) => {
      this.loading = false;
      this.toastr.success('Update successfully');
      this.router.navigate(['/fsstaff/order']);
    }, error => {
      this.loading = false;
      this.toastr.error(error);
    });
  }

  onSubmit() {
    if (this.reasonForm.invalid) {
      this.markControlsAsTouched();
      return;
    }
    this.loading = true;
    let reason: string;
    reason = 'Restaurant: ' + this.reasonForm.get('reason').value;
    this.reasonForm.get('reason').setValue(reason);
    this.foodstallStaffService.cancelOrderDetail(this.reasonForm.value).subscribe(data => {
      this.loading = false;
      this.toastr.success('Canceled order successfully');
      this.vc.clear();
      document.body.removeChild(this.backdrop);
      this.router.navigate(['/fsstaff/order']);
    }, error => {
      this.loading = false;
      this.toastr.error(error);
    });
  }

  markControlsAsTouched() {
    Object.keys(this.reasonForm.controls).forEach(key => {
      this.reasonForm.controls[key].markAsTouched();
    });
  }

}
