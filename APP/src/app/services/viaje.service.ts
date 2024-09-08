import { Injectable } from '@angular/core';
import { Viajes } from '../interfaces/viajes';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  
  viajes: Viajes[] = [
    { 
        codigo: 'V001', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-01 08:00', 
        final: '2024-09-01 09:00', 
        fecha: '2024-09-01', 
        nom_pasajero: 'Sofía Álvarez', 
        nom_conductor: 'Juan Pérez', 
        patente: 'ABC123',
        coordenada: '-33.4728,-70.6107',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    },
    { 
        codigo: 'V002', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-02 09:30', 
        final: '2024-09-02 10:30', 
        fecha: '2024-09-02', 
        nom_pasajero: 'Carlos Mendoza', 
        nom_conductor: 'María Gómez', 
        patente: 'XYZ987',
        coordenada: '-33.4630,-70.6215',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    },
    { 
        codigo: 'V003', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-03 07:45', 
        final: '2024-09-03 08:30', 
        fecha: '2024-09-03', 
        nom_pasajero: 'Isabel Morales', 
        nom_conductor: 'Luis Martínez', 
        patente: 'LMN456',
        coordenada: '-33.4700,-70.6235',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    },
    { 
        codigo: 'V004', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-04 10:00', 
        final: '2024-09-04 11:00', 
        fecha: '2024-09-04', 
        nom_pasajero: 'Roberto Ramírez', 
        nom_conductor: 'Ana Fernández', 
        patente: 'JKL321',
        coordenada: '-33.4589,-70.6154',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    },
    { 
        codigo: 'V005', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-05 11:15', 
        final: '2024-09-05 12:00', 
        fecha: '2024-09-05', 
        nom_pasajero: 'Claudia González', 
        nom_conductor: 'Pedro Rodríguez', 
        patente: 'GHI654',
        coordenada: '-33.4856,-70.6003',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    },
    { 
        codigo: 'V006', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-06 06:00', 
        final: '2024-09-06 07:00', 
        fecha: '2024-09-06', 
        nom_pasajero: 'Ricardo Silva', 
        nom_conductor: 'Mario Gutiérrez', 
        patente: 'JKL789',
        coordenada: '-33.4789,-70.6078',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    },
    { 
        codigo: 'V007', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-07 13:00', 
        final: '2024-09-07 14:00', 
        fecha: '2024-09-07', 
        nom_pasajero: 'María López', 
        nom_conductor: 'Luis Fernández', 
        patente: 'MNO456',
        coordenada: '-33.4712,-70.6251',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    },
    { 
        codigo: 'V008', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-08 08:00', 
        final: '2024-09-08 09:00', 
        fecha: '2024-09-08', 
        nom_pasajero: 'Andrés Vargas', 
        nom_conductor: 'Claudia Reyes', 
        patente: 'DEF123',
        coordenada: '-33.4605,-70.6132',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    },
    { 
        codigo: 'V009', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-09 07:00', 
        final: '2024-09-09 08:00', 
        fecha: '2024-09-09', 
        nom_pasajero: 'Natalia Gómez', 
        nom_conductor: 'Javier Martínez', 
        patente: 'XYZ654',
        coordenada: '-33.4668,-70.6174',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    },
    { 
        codigo: 'V010', 
        nom_destino: 'Duoc UC Sede Puente Alto', 
        inicio: '2024-09-10 09:00', 
        final: '2024-09-10 10:00', 
        fecha: '2024-09-10', 
        nom_pasajero: 'Fernando Aguirre', 
        nom_conductor: 'Valeria Ortega', 
        patente: 'ABC987',
        coordenada: '-33.4745,-70.6050',  // Coordenada aleatoria en Santiago (ejemplo)
        coordenada_destino: '-33.6105,-70.5686'  // Coordenada de Duoc UC Sede Puente Alto
    }
  ];

  constructor() { }

  getViajes(){
    return this.viajes;
  }

  getViajesByNombre(){

  }

  addViaje(viaje: Viajes){
    this.viajes.push(viaje)
  }

  deleteViaje(){

  }

  updateViaje(){

  }
}
