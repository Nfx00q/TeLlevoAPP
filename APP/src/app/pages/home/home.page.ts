import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  usuarios: Usuario[] = [];
  presentingElement = null;

  public nombreUsuario?: string;
  public apellidoUsuario?: string;
  public img_usuario?: string;
  usuarioLogin?: string;

  map: any;

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() { 
    this.usuarioLogin = localStorage.getItem('usuarioLogin') || '';
    this.config();
    this.loadGoogleMaps().then(() => {
      this.initMap();
    });
  }

  initMap() {
    const mapOptions = {
      center: { lat: -33.59841000351409, lng: -70.57834513910244 },
      zoom: 13,
      disableDefaultUI: true,
    };
    
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
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

  // UBICACIONES

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
    {
      lat: -33.5800609330941,
      lng: -70.58197464104566,
      icon: 'assets/icon/stop.png',
      label: 'TL-1 / Av. Gabriela & Av. Concha y Toro',
      value: 'tl1'  // Valor para usar en el select
    },
    {
      lat: -33.57426112502435,
      lng: -70.55495967884225,
      icon: 'assets/icon/stop.png',
      label: 'TL-2 / Av. Gabriela Ote. & Av. Camilo Henriquez',
      value: 'tl2'  // Valor para usar en el select
    },
    {
      lat: -33.56692284768454,
      lng: -70.63052933119687,
      icon: 'assets/icon/stop.png',
      label: 'TL-3 / Av. Observatorio & Av. Sta. Rosa',
      value: 'tl3'  // Valor para usar en el select
    },
  ];

  ngAfterViewInit() {
    
  }

  startTrip() {
    
  }

  goToConfig() {
    this.router.navigate(['/config-page']);
  }
}
