import { Injectable } from '@angular/core';
import { Conductor } from '../interfaces/conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor() { }

  Conductores: Conductor[] = [
    { 
      img_conductor: 'assets/conductores/luis.jpg',
      nombre: 'Luis',
      apellido: 'Elias',
      rut: '11.225.316-9',
      edad: '25',
      email: 'luis@example.com',
      pass: 'luis123',
      patente: 'XLSX41',
      modelo_veh: 'Morning 3',
      marca_veh: 'Kia',
      color_veh: 'Negro',
      img_veh: 'assets/vehiculos/kia_morning3.png',
    },
    { 
      img_conductor: 'assets/conductores/maria.jpg',
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
      img_conductor: 'assets/conductores/pedro.jpeg',
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
      img_conductor: 'assets/conductores/ana.png',
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
  ];

  getConductor(){
    return this.Conductores;
  }

  getConductorByEmail(email: string): Conductor | undefined {
    return this.Conductores.find(conductor => conductor.email === email);
  }

  addConductor(Conductor: Conductor){
    this.Conductores.push(Conductor)
  }

  deleteConductor(){

  }

  updateConductor(){

  }
}
