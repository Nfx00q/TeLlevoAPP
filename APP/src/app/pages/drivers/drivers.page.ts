import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

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

  ngAfterViewInit() {
    setTimeout(() => {

      var map = L.map('map', {
        zoomControl: false
      }).setView([-33.59805940505581, -70.57816364636162], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
      }).addTo(map);

      var customIcon = L.icon({
        iconUrl: 'assets/icon/instituto.png',
        iconSize: [40, 40],
        iconAnchor: [40, 40],
        popupAnchor: [-3, -76] 
      });

      L.marker([-33.598460591168845, -70.57876561786227], { icon: customIcon }).addTo(map)

      this.markers.forEach(marker => {
        L.marker([marker.lat, marker.lng])
          .addTo(map)
          .openPopup();
      });

      map.setView([-33.59805940505581, -70.57816364636162], 15);

    }, 1000);
  }

}
