import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Conductor } from 'src/app/interfaces/conductor';
import { ConductorService } from 'src/app/services/conductor.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  markers = [
    { lat: -33.5791787663939, lng: -70.58202650110043},
    { lat: -33.55333862632548, lng: -70.5867276319482},
    { lat: -33.50828814033571, lng: -70.61039431815159},
    { lat: -33.66833314724194, lng: -70.58517694562185},
  ];

  usuarios: Usuario[] = [];
  conductores: Conductor[] = [];

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellidoUsuario?: string;

  constructor(private conductorService: ConductorService, 
    private usuarioService: UsuarioService, 
    private toastController: ToastController, 
    private modalController: ModalController,
    private alertController: AlertController) {}

  ngOnInit(){ 
    this.conductores = this.conductorService.getConductor();
    this.usuarios = this.usuarioService.getUsuario();

    const usuarioLogin = localStorage.getItem('usuarioLogin');
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.nombreUsuario = user.nombre;
      this.apellidoUsuario = user.apellido;
    }

  }

  ngAfterViewInit() {
    setTimeout(() => {
      // Inicializar el mapa y centrarlo en las coordenadas de Duoc UC sede Puente Alto
      var map = L.map('map', {
        zoomControl: false
      }).setView([-33.59805940505581, -70.57816364636162], 15);

      // Añadir la capa de tiles de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
      }).addTo(map);

      // Define el icono personalizado
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

  async reservar(){
    const toast = await this.toastController.create({
      message: 'Reserva gestionada con exito',
      duration: 2000,
      color: 'tertiary',
      position: 'top'
    });
    toast.present();

    // Cerrar el modal
    const modal = await this.modalController.getTop();
    if (modal) {
      await modal.dismiss();
    }


  }

  async comenzarViaje(){
    const toast = await this.toastController.create({
      message: 'Creando viaje y buscando conductor...',
      duration: 2000,
      color: 'dark',
      position: 'top'
    });
    toast.present();

    setTimeout(() => {
      this.buscarConductor();
    }, 2000)

    // Cerrar el modal
    const modal = await this.modalController.getTop();
    if (modal) {
      await modal.dismiss();
    }

  }

  async buscarConductor() {
    // Obtener todos los conductores
    const conductores = this.conductorService.getConductor();

    // Filtrar los conductores activos
    const conductoresActivos = conductores.filter(conductor => conductor.estado === 'activo');

    // Crear el mensaje para el alert
    let mensaje = '';
    if (conductoresActivos.length > 0) {
      mensaje = conductoresActivos.map(conductor => 
        `Nombre: ${conductor.nombre} ${conductor.apellido}, Email: ${conductor.email}, Patente: ${conductor.patente}`
      ).join('\n');
    } else {
      mensaje = 'No hay conductores activos.';
    }

    // Mostrar el alert
    const alert = await this.alertController.create({
      header: 'Conductores Activos',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  
}
