import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Conductor } from 'src/app/interfaces/conductor';
import { ConductorService } from 'src/app/services/conductor.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuarios: Usuario[] = [];
  conductores: Conductor[] = [];

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;

  constructor(private conductorService: ConductorService, private usuarioService: UsuarioService) {}

  ngOnInit(){ 
    this.conductores = this.conductorService.getConductor();
    this.usuarios = this.usuarioService.getUsuario();

    const usuarioLogin = localStorage.getItem('usuarioLogin');
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.nombreUsuario = user.nombre;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // Inicializar el mapa y centrarlo en las coordenadas de Duoc UC sede Puente Alto
      var map = L.map('map').setView([-33.598460591168845, -70.57876561786227], 15);

      // Añadir la capa de tiles de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
      }).addTo(map);

      // Define el icono personalizado
      var customIcon = L.icon({
        iconUrl: 'assets/icon/instituto.png',
        iconSize: [45, 45],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76] 
      });

      L.marker([-33.598460591168845, -70.57876561786227], { icon: customIcon }).addTo(map)
    }, 1000);
  }
  
}
