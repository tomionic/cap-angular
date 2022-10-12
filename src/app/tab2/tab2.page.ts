import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  maxPickupDate: Date | string;

  constructor() {}

  ngOnInit() {
    let formatMaxDate = new Date();
    formatMaxDate.setDate(formatMaxDate.getDate() + 30);
    this.maxPickupDate = formatMaxDate.toISOString();
    console.log(this.maxPickupDate);
  }

}
