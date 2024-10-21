import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

declare var google: any;
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {

  usuarios: Usuario[] = [];
  presentingElement = null;

  public nombreUsuario?: string;
  public apellidoUsuario?: string;
  public img_usuario?: string;
  usuarioLogin?: string;

  map: any;

  markers = [
    { lat: -33.5791787663939, lng: -70.58202650110043},
    { lat: -33.55333862632548, lng: -70.5867276319482},
    { lat: -33.50828814033571, lng: -70.61039431815159},
    { lat: -33.66833314724194, lng: -70.58517694562185},
  ];

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit() { 
    this.usuarioLogin = localStorage.getItem('usuarioLogin') || '';
    this.config();
    this.loadGoogleMaps().then(() => {
      this.initMap();
    });
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
  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      if (typeof google !== 'undefined') {
        resolve(true);
      } else {
        window['googleMapsCallback'] = () => {
          resolve(true);
        };
  
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAp4tplN5KEmKIHOV4vyFXuS6KKFsJqESg&callback=googleMapsCallback`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    });
  }
  ubicaciones = [
    {
      lat: -33.598460591168845,
      lng: -70.57876561786227,
      icon: 'assets/icon/instituto.png',
      label: 'Cede Puente Alto',
      value: 'puente_alto'  // Valor para usar en el select
    },
    {
      lat: -33.66860553928277,
      lng: -70.58535175998844,
      icon: 'assets/icon/instituto.png',
      label: 'Cede Pirque',
      value: 'pirque'  // Valor para usar en el select
    },
    
  ];

  initMap() {
    const mapOptions = {
      center: { lat: -33.59841000351409, lng: -70.57834513910244 },
      zoom: 13,
      disableDefaultUI: true,
    };
    
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Agregar marcadores al mapa
    this.ubicaciones.forEach((ubicacion) => {
      const marker = new google.maps.Marker({
        position: { lat: ubicacion.lat, lng: ubicacion.lng },
        map: this.map,
        icon: {
          url: ubicacion.icon,  // Ruta del icono
          scaledSize: new google.maps.Size(40, 40),  // Cambia el tamaño aquí (ancho, alto)
        },
        title: ubicacion.label, // Título del marcador
      });

      // Opcional: Puedes agregar un evento de clic para mostrar información
      const infoWindow = new google.maps.InfoWindow({
        content: `<p>${ubicacion.label}</p>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    });
  }


}
