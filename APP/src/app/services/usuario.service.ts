import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  usuarios: Usuario[] = [
    { 
      img_usuario: 'assets/usuarios/luis.jpg',
      email: 'luis@user.com', 
      tipo: 'usuario', 
      nombre: 'Luis', 
      apellido: 'Gonzalez', 
      pass: 'luis123'
    },
    { 
      img_usuario: 'assets/usuarios/maria.jpg',
      email: 'maria@user.com', 
      tipo: 'usuario', 
      nombre: 'Maria', 
      apellido: 'Gonzalez', 
      pass: 'maria123'
    },
    { 
      img_usuario: 'assets/usuarios/carlos.png',
      email: 'carlos@admin.com', 
      tipo: 'admin', 
      nombre: 'Carlos', 
      apellido: 'Martinez', 
      pass: 'carlos123'
    },
    { 
      img_usuario: 'assets/usuarios/ana.jpg',
      email: 'ana@admin.com', 
      tipo: 'admin', 
      nombre: 'Ana', 
      apellido: 'Lopez', 
      pass: 'ana123'
    },
  ];
  
  

  getUsuario(){
    return this.usuarios;
  }
  getUsuarioByEmail(){

  }

  addUsuario(usuario: Usuario){
    this.usuarios.push(usuario)
  }

  deleteUsuario(){

  }

  updateUsuario(){

  }
}
