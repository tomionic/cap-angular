import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  willCallForm: FormGroup;
  dateTime$: BehaviorSubject<Date>;
  minPickupDate: Date | string;
  maxPickupDate: Date | string;
  editMode: Boolean;

  orderHeader: {willCallDateTime: Date | string,
    orderType: 'WC',
    confirmedDeliveryDate: any,
    purchaseOrderNumber: any,
    willCallSpecialInstructions: any};

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}
  
  ngOnInit() {
    let formatMinDate = new Date();
    formatMinDate.setHours(formatMinDate.getHours() + 1);
    this.minPickupDate = formatMinDate.toISOString();

    if (!!this.orderHeader?.willCallDateTime) {
      this.minPickupDate = this.orderHeader?.willCallDateTime;
    }

    let formatMaxDate = new Date();;
    formatMaxDate.setDate(formatMaxDate.getDate() + 30);

    console.log(formatMaxDate);
    this.maxPickupDate = formatMaxDate.toISOString();
    console.log(this.maxPickupDate);

    if (this.orderHeader?.orderType === 'WC') {
      this.editMode = true;
    }

    this.willCallForm = this.fb.group({
      originalDeliveryDate: new FormControl(
        this.datePipe.transform(
          this.orderHeader?.confirmedDeliveryDate,
          'M/d/yyyy',
          'GMT',
        ),
      ),
      pickupDateTime: new FormControl(this.minPickupDate),
      customerName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ]),
      customerPo: new FormControl(
        this.orderHeader?.purchaseOrderNumber
          ? this.orderHeader?.purchaseOrderNumber
          : 'N/A',
      ),
      willCallType: new FormControl('Customer'),
      specialInstructions: new FormControl(
        !!this.orderHeader?.willCallSpecialInstructions
          ? this.orderHeader?.willCallSpecialInstructions
          : '',
        [Validators.maxLength(100)],
      ),
    });
  }

}
