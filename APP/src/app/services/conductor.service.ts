import { Injectable } from '@angular/core';
import { Conductor } from '../interfaces/conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor() { }

  Conductores: Conductor[] = [
    { 
      img_conductor: 'assets/conductores/juanelias.png',
      nombre: 'Juan',
      apellido: 'Elias',
      rut: '11.225.316-9',
      edad: '25',
      email: 'juan@example.com',
      pass: 'juan123',
      patente: 'XLSX41',
      modelo_veh: 'Morning 3',
      marca_veh: 'Kia',
      color_veh: 'Negro',
      img_veh: 'assets/vehiculos/kia_morning3.png',
    },
    { 
      img_conductor: 'assets/conductores/mariagonzalez.png',
      nombre: 'Maria',
      apellido: 'Gonzalez',
      rut: '12.345.678-0',
      edad: '30',
      email: 'maria@example.com',
      pass: 'maria123',
      patente: 'ABC123',
      modelo_veh: 'Civic',
      marca_veh: 'Honda',
      color_veh: 'Rojo',
      img_veh: 'assets/vehiculos/honda_civic.png',
    },
    { 
      img_conductor: 'assets/conductores/pedrofernandez.png',
      nombre: 'Pedro',
      apellido: 'Fernandez',
      rut: '13.456.789-1',
      edad: '28',
      email: 'pedro@example.com',
      pass: 'pedro123',
      patente: 'XYZ789',
      modelo_veh: 'Corolla',
      marca_veh: 'Toyota',
      color_veh: 'Blanco',
      img_veh: 'assets/vehiculos/toyota_corolla.png',
    },
    { 
      img_conductor: 'assets/conductores/anafernandez.png',
      nombre: 'Ana',
      apellido: 'Fernandez',
      rut: '14.567.890-2',
      edad: '32',
      email: 'ana@example.com',
      pass: 'ana123',
      patente: 'LMN456',
      modelo_veh: 'Model 3',
      marca_veh: 'Tesla',
      color_veh: 'Azul',
      img_veh: 'assets/vehiculos/tesla_model3.png',
    },
    { 
      img_conductor: 'assets/conductores/carlosrodriguez.png',
      nombre: 'Carlos',
      apellido: 'Rodriguez',
      rut: '15.678.901-3',
      edad: '27',
      email: 'carlos@example.com',
      pass: 'carlos123',
      patente: 'QRS678',
      modelo_veh: 'Mustang',
      marca_veh: 'Ford',
      color_veh: 'Negro',
      img_veh: 'assets/vehiculos/ford_mustang.png',
    },
    { 
      img_conductor: 'assets/conductores/luisgarcia.png',
      nombre: 'Luis',
      apellido: 'Garcia',
      rut: '16.789.012-4',
      edad: '29',
      email: 'luis@example.com',
      pass: 'luis123',
      patente: 'TUV910',
      modelo_veh: 'A4',
      marca_veh: 'Audi',
      color_veh: 'Gris',
      img_veh: 'assets/vehiculos/audi_a4.png',
    },
    { 
      img_conductor: 'assets/conductores/sofiaramirez.png',
      nombre: 'Sofia',
      apellido: 'Ramirez',
      rut: '17.890.123-5',
      edad: '26',
      email: 'sofia@example.com',
      pass: 'sofia123',
      patente: 'WXY234',
      modelo_veh: 'CX-5',
      marca_veh: 'Mazda',
      color_veh: 'Verde',
      img_veh: 'assets/vehiculos/mazda_cx5.png',
    },
    { 
      img_conductor: 'assets/conductores/andreslopez.png',
      nombre: 'Andres',
      apellido: 'Lopez',
      rut: '18.901.234-6',
      edad: '31',
      email: 'andres@example.com',
      pass: 'andres123',
      patente: 'ZAB567',
      modelo_veh: 'X5',
      marca_veh: 'BMW',
      color_veh: 'Plateado',
      img_veh: 'assets/vehiculos/bmw_x5.png',
    },
    { 
      img_conductor: 'assets/conductores/paulagonzalez.png',
      nombre: 'Paula',
      apellido: 'Gonzalez',
      rut: '19.012.345-7',
      edad: '33',
      email: 'paula@example.com',
      pass: 'paula123',
      patente: 'CDE890',
      modelo_veh: 'Q5',
      marca_veh: 'Audi',
      color_veh: 'Rojo',
      img_veh: 'assets/vehiculos/audi_q5.png',
    },
    { 
      img_conductor: 'assets/conductores/ricardomartinez.png',
      nombre: 'Ricardo',
      apellido: 'Martinez',
      rut: '20.123.456-8',
      edad: '34',
      email: 'ricardo@example.com',
      pass: 'ricardo123',
      patente: 'FGH123',
      modelo_veh: 'Cherokee',
      marca_veh: 'Jeep',
      color_veh: 'Negro',
      img_veh: 'assets/vehiculos/jeep_cherokee.png',
    },
  ];

  getConductor(){
    return this.Conductores;
  }

  getConductorByRUT(){

  }

  addConductor(Conductor: Conductor){
    this.Conductores.push(Conductor)
  }

  deleteConductor(){

  }

  updateConductor(){

  }
}
