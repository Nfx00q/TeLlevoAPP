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

  private renderers: any[] = []; // Cambia el tipo a any


  usuarios: Usuario[] = [];
  presentingElement = null;

  public nombreUsuario?: string;
  public apellidoUsuario?: string;
  public img_usuario?: string;
  usuarioLogin?: string;

  map: any;
  directionsService: any;
  directionsRenderer: any;

  ubicacionInicio: string | null = null;
  ubicacionDestino: string | null = null;

  

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngAfterViewInit() {}

  ngOnInit() { 
    this.usuarioLogin = localStorage.getItem('usuarioLogin') || '';
    this.config();
    this.loadGoogleMaps().then(() => {
      this.initMap();
    });
  }

  // UBICACIONES
  ubicaciones = [
    {
      lat: -33.598425578019224,
      lng: -70.57833859675443,
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

  initMap() {
    const mapOptions = {
      center: { lat: -33.59841000351409, lng: -70.57834513910244 },
      zoom: 13,
      disableDefaultUI: true,
      styles: [
        {
          featureType: "poi",
          stylers: [
            { visibility: "off" } // Oculta los puntos de interés
          ]
        },
        {
          featureType: "road",
          stylers: [
            { visibility: "on" } // Muestra las carreteras
          ]
        },
        {
          featureType: "water",
          stylers: [
            { visibility: "on" } // Muestra los cuerpos de agua
          ]
        },
        {
          featureType: "landscape",
          stylers: [
            { visibility: "on" } // Muestra el paisaje
          ]
        }
      ]
    };
  
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    // Crear el servicio de direcciones y el renderer
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // Elimina los marcadores "A" y "B"
      polylineOptions: {
        strokeColor: '#242424', // Color de la línea: negro
        strokeWeight: 8,        // Grosor de la línea
      },
    });
  
    this.directionsRenderer.setMap(this.map);

    // Verificar si el navegador soporta la geolocalización
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
              };

              // Marcar la ubicación en el mapa
              new google.maps.Marker({
                  position: pos,
                  map: this.map,
                  title: "Tu ubicación actual",
                  icon: {
                    url: 'assets/icon/ubi.png', // Cambia esta línea por la ruta a tu icono
                    scaledSize: new google.maps.Size(50, 50), // Escala el tamaño del icono
                    // Puedes agregar más opciones aquí, como anchor, origin, etc.
                },
              });

              // Centrar el mapa en la ubicación actual
              this.map.setCenter(pos);
          },
          () => {
              // Manejo de errores en caso de que no se pueda obtener la ubicación
              handleLocationError(true, this.map.getCenter());
          }
      );
    } else {
        // Navegador no soporta la geolocalización
        handleLocationError(false, this.map.getCenter());
    }

    function handleLocationError(browserHasGeolocation: boolean, pos: any) {
      alert(browserHasGeolocation
          ? "Error: El servicio de geolocalización ha fallado."
          : "Error: Tu navegador no soporta la geolocalización.");
    }
  
    // Agregar marcadores de ubicaciones predefinidas
    this.ubicaciones.forEach((ubicacion) => {
      const marker = new google.maps.Marker({
        position: { lat: ubicacion.lat, lng: ubicacion.lng },
        map: this.map,
        icon: {
          url: ubicacion.icon,
          scaledSize: new google.maps.Size(40, 40),
        },
        title: ubicacion.label,
      });
  
      const infoWindow = new google.maps.InfoWindow({
        content: `<p>${ubicacion.label}</p>`,
      });
  
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
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

  startTrip() {
    if (this.ubicacionInicio && this.ubicacionDestino) {
      const inicio = this.ubicaciones.find((ubicacion) => ubicacion.value === this.ubicacionInicio);
      const destino = this.ubicaciones.find((ubicacion) => ubicacion.value === this.ubicacionDestino);

      if (inicio && destino) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Limpiar las rutas anteriores
            this.renderers.forEach(renderer => renderer.setMap(null)); // Elimina todas las rutas del mapa
            this.renderers = []; // Vacía el array de renderizadores

            // Ruta desde la ubicación actual del usuario hasta el punto inicial
            const request1 = {
              origin: pos,
              destination: { lat: inicio.lat, lng: inicio.lng },
              travelMode: google.maps.TravelMode.WALKING, // Modo de transporte a pie
            };

            // Ruta desde el punto inicial hasta el destino
            const request2 = {
              origin: { lat: inicio.lat, lng: inicio.lng },
              destination: { lat: destino.lat, lng: destino.lng },
              travelMode: google.maps.TravelMode.DRIVING, // Modo de transporte en vehículo
            };

            // Crear dos instancias de DirectionsRenderer
            const walkingRenderer = new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: 'rgba(0,0,0,0)', // Color de la línea para la ruta del usuario al inicio
                strokeWeight: 6,
                strokeOpacity: 0.7,
                geodesic: true,
                icons: [{
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 2,
                    fillColor: '#242424',
                    fillOpacity: 1,
                    strokeColor: '#242424',
                    strokeOpacity: 1
                  },
                  offset: '0%',
                  repeat: '8px'
                }]
              }
            });

            const drivingRenderer = new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#000000', // Color negro para la línea del vehículo
                strokeWeight: 6,
                strokeOpacity: 0.7,
                geodesic: true,
              }
            });

            // Establecer el mapa para cada renderer
            walkingRenderer.setMap(this.map);
            drivingRenderer.setMap(this.map);

            // Almacenar los renderizadores en el array
            this.renderers.push(walkingRenderer);
            this.renderers.push(drivingRenderer);

            // Calcular la primera ruta
            this.directionsService.route(request1, (result: any, status: any) => {
              if (status === google.maps.DirectionsStatus.OK) {
                walkingRenderer.setDirections(result);
              } else {
                console.error('Error al calcular la ruta desde la ubicación actual al punto inicial', status);
              }
            });

            // Calcular la ruta para el vehículo
            this.directionsService.route(request2, (result: any, status: any) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.directionsRenderer.setDirections(result);

                // Acceder al tiempo estimado
                const duration = result.routes[0].legs[0].duration; // Tiempo estimado
                const durationText = duration.text; // Texto legible para el tiempo

                // Obtener el elemento y verificar si existe
                const durationElement = document.getElementById('duration');
                if (durationElement) {
                  durationElement.innerText = durationText; // Solo asignar si el elemento no es null
                } else {
                  console.error('Elemento con ID "duration" no encontrado.');
                }

                console.log(`Tiempo estimado de viaje: ${durationText}`);

                this.directionsRenderer.setOptions({
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: '#000000', // Cambiar a color negro para la línea del vehículo
                    strokeWeight: 6,
                    strokeOpacity: 0.7,
                    geodesic: true,
                    icons: [{
                      icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 2,
                        fillColor: '#000000',
                        fillOpacity: 1,
                        strokeColor: '#000000',
                        strokeOpacity: 1
                      },
                      offset: '0%',
                      repeat: '20px'
                    }]
                  }
                });
              } else {
                console.error('Error al calcular la ruta desde el punto inicial al destino', status);
              }
            });
          },
          () => {
            handleLocationError(true, this.map.getCenter());
          }
        );
      } else {
        console.error('Error: Punto inicial o destino no encontrado.');
      }
    } else {
      console.log('Por favor, selecciona ambas ubicaciones.');
    }
  }


  onInicioChange() {
    if (this.ubicacionDestino === this.ubicacionInicio) {
      this.ubicacionDestino = null;
    }
  }

  getOpcionesDestino() {
    return this.ubicaciones.filter(ubicacion => ubicacion.value !== this.ubicacionInicio);
  }

  goToConfig() {
    this.router.navigate(['/config-page']);
  }
}
function handleLocationError(arg0: boolean, arg1: any) {
  throw new Error('Function not implemented.');
}

