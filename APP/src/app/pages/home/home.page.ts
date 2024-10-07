import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuarios: Usuario[] = [];
  
  markers = [
    { lat: -33.5791787663939, lng: -70.58202650110043 },
    { lat: -33.55333862632548, lng: -70.5867276319482 },
    { lat: -33.50828814033571, lng: -70.61039431815159 },
    { lat: -33.66833314724194, lng: -70.58517694562185 },
  ];

  public nombreUsuario?: string;
  public apellidoUsuario?: string;
  usuarioLogin?: string;

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() { 
    this.usuarioLogin = localStorage.getItem('usuarioLogin') || '';
    this.config();
  }

  config() {
    this.firestore.collection('usuarios').valueChanges().subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
      const usuarioEncontrado = this.usuarios.find((usuario) => usuario.email === this.usuarioLogin);
      if (usuarioEncontrado) {
        this.nombreUsuario = usuarioEncontrado.nombre;
        this.apellidoUsuario = usuarioEncontrado.apellido;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      var map = L.map('map', {
        zoomControl: false
      }).setView([-33.59805940505581, -70.57816364636162], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 13
      }).addTo(map);

      var customIcon = L.icon({
        iconUrl: 'assets/icon/instituto.png',
        iconSize: [40, 40],
        iconAnchor: [40, 40],
        popupAnchor: [-3, -76] 
      });

      L.marker([-33.598460591168845, -70.57876561786227], { icon: customIcon }).addTo(map);

      this.markers.forEach(marker => {
        L.marker([marker.lat, marker.lng])
          .addTo(map)
          .openPopup();
      });

      map.setView([-33.59805940505581, -70.57816364636162], 15);
    }, 1000);
  }

  goToConfig(){
    this.router.navigate(['/config-page'])
  }
}
