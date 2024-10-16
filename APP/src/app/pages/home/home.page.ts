import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuarios: Usuario[] = [];
  presentingElement = null;

  public nombreUsuario?: string;
  public apellidoUsuario?: string;
  public img_usuario?: string;
  usuarioLogin?: string;

  constructor(private firestore: AngularFirestore, private router: Router, private modalController: ModalController) {}

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
        this.img_usuario = usuarioEncontrado.img_usuario;
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

      map.setView([-33.59805940505581, -70.57816364636162], 15);
    }, 1000);
  }

  goToConfig(){
    this.router.navigate(['/config-page']);
  }
}
