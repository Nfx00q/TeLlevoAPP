import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {

  markers = [
    { lat: -33.5791787663939, lng: -70.58202650110043},
    { lat: -33.55333862632548, lng: -70.5867276319482},
    { lat: -33.50828814033571, lng: -70.61039431815159},
    { lat: -33.66833314724194, lng: -70.58517694562185},
  ];

  constructor() { }

  ngOnInit() {
  }

}
