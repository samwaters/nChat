import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-crypto-dialog',
  templateUrl: './crypto-dialog.component.html',
  styleUrls: ['./crypto-dialog.component.css']
})
export class CryptoDialogComponent implements OnInit {

  constructor(public dialogRef:MdDialogRef<CryptoDialogComponent>) {}

  ngOnInit() {
  }

}
