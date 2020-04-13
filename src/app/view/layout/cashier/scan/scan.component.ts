import { Component, ViewChild, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { CashierService } from 'src/app/service/cashier.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  @ViewChild('modal_1', { static: false }) modal_1: TemplateRef<any>;
  @ViewChild('vc', { static: true, read: ViewContainerRef }) vc: ViewContainerRef;
  backdrop: any;
  walletId = '';
  scan = false;
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];

  info;

  constructor(private cashierService: CashierService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  showDialog() {
    this.scan = true;
    const view = this.modal_1.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV')
    this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop);
  }

  closeDialog() {
    this.scan = false;
    this.vc.clear()
    document.body.removeChild(this.backdrop);
  }

  onSearch() {
    var numbers = /^[0-9]+$/;
      if (!this.walletId.match(numbers)) {
        this.toastr.error('WalletId must contain only numberic');
        return;
      }
    this.cashierService.scanQRCode(this.walletId)
    .subscribe(res => {
      this.info = res;
      console.log(this.info);
    },
      error => {
        this.toastr.error(error);
      });
  }

  onCodeResult(resultString: string) {
    this.walletId = resultString;
    this.closeDialog();
    this.onSearch();
  }

  onWithdraw() {
    this.router.navigate([`/cashier/customer/${this.info.userId}/withdraw`]);
  }

  onDeposit() {
    this.router.navigate([`/cashier/customer/${this.info.userId}/deposit`]);
  }
}
