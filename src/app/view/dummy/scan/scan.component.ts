import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  wallet = '';
  scan = false;
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];

  constructor() { }

  ngOnInit() {
  }

  startScan() {
    this.scan = true;
  }

  onCodeResult(resultString: string) {
    this.wallet = resultString;
    this.scan = false;
  }

}
