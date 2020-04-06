import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CashierService} from '../../../../service/cashier.service';
import {CanComponentDeactivate} from '../../../../service/can-deactivate-guard.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit, CanComponentDeactivate {

  formSubmitted = false;
  depositForm: FormGroup;
  userId: number;
  balance: number;
  walletId: number;

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
    this.cashierService.getWalletDetail(this.userId).subscribe(data => {
      this.balance = data.balances;
      this.walletId = data.id;
    }, error => {
      // alert(error);
      this.toastr.error(error);
    });
    this.depositForm = new FormGroup({
      assert: new FormControl('deposit'),
      balance: new FormControl(1000, [Validators.required, Validators.min(1000)]),
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.markControlsAsTouched();
    if (this.depositForm.invalid) {
      this.formSubmitted = false;
      return;
    }
    this.cashierService.updateBalance(this.walletId, this.depositForm.get('balance').value, this.depositForm.get('assert').value)
      .subscribe((data: any) => {
        console.log(data);
        // alert('Deposit successfully');
        this.toastr.success('Deposit successfully');
        this.createForm();
        // this.router.navigate(['/cashier/customer']);
      }, (error) => {
        this.formSubmitted = false;
        this.toastr.error(error);
        // alert(error);
        // this.catchError.error = data;
        // this.router.navigate(['/error']);
      });
  }

  markControlsAsTouched() {
    Object.keys(this.depositForm.controls).forEach(key => {
      this.depositForm.controls[key].markAsTouched();
    });
  }

  canDeactivate(): boolean {
    if (this.depositForm.dirty && !this.formSubmitted) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
