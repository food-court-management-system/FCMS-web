import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FoodStallDto} from '../../../../dtos/foodStall.dto';
import {AdminService} from '../../../../service/admin.service';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';
import {CashierService} from '../../../../service/cashier.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit, CanComponentDeactivate {

  formSubmitted = false;
  withdrawForm: FormGroup;
  userId: number;
  balance: number;
  walletId: number;
  loading = false;

  constructor(private route: ActivatedRoute,
              private cashierService: CashierService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userId = +params['id'];
        }
      );
    this.formSubmitted = false;
    this.createForm();
  }

  onClear() {
    // this.router.navigate(['/projects']);
    this.createForm();
  }

  createForm() {
    this.loading = true;
    this.cashierService.getWalletDetail(this.userId).subscribe(data => {
      this.balance = data.balances;
      this.walletId = data.id;
      this.loading = false;
    }, error => {
      // alert(error);
      this.toastr.error(error);
      this.loading = false;
    });
    this.withdrawForm = new FormGroup({
      assert: new FormControl('withdrawals'),
      balance: new FormControl(1000, [Validators.required, Validators.min(1000)]),
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.markControlsAsTouched();
    if (+this.withdrawForm.get('balance').value > this.balance) {
      this.withdrawForm.get('balance').setErrors({['invalid']: true});
      this.formSubmitted = false;
      return;
    }
    if (this.withdrawForm.invalid) {
      this.formSubmitted = false;
      return;
    }
    this.loading = true;
    this.cashierService.updateBalance(this.walletId, this.withdrawForm.get('balance').value, this.withdrawForm.get('assert').value)
      .subscribe((data: any) => {
        this.toastr.success('Withdraw successfully');
      // console.log(data);
      // alert('Withdraw successfully');
        this.loading = false;
        this.createForm();
      // this.router.navigate(['/cashier/customer']);
    }, (error) => {
        this.toastr.error(error);
        this.loading = false;
      // alert(error);
      // this.catchError.error = data;
      // this.router.navigate(['/error']);
    });
  }

  markControlsAsTouched() {
    Object.keys(this.withdrawForm.controls).forEach(key => {
      this.withdrawForm.controls[key].markAsTouched();
    });
  }

  canDeactivate(): boolean {
    if (this.withdrawForm.dirty && !this.formSubmitted) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
