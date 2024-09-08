import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  usuarios: Usuario[] = [
    { 
      img_usuario: 'assets/usuarios/maria.jpg',
      email: 'maria@admin.com', 
      tipo: 'admin', 
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
    { 
      email: 'javier@admin.com', 
      tipo: 'admin', 
      nombre: 'Javier', 
      apellido: 'Fernandez', 
      pass: 'javier123'
    },
    { 
      email: 'lucia@user.com', 
      tipo: 'usuario', 
      nombre: 'Lucia', 
      apellido: 'Perez', 
      pass: 'lucia123'
    },
    { 
      email: 'diego@user.com', 
      tipo: 'usuario', 
      nombre: 'Diego', 
      apellido: 'Ramirez', 
      pass: 'diego123'
    },
    { 
      email: 'sofia@user.com', 
      tipo: 'usuario', 
      nombre: 'Sofia', 
      apellido: 'Hernandez', 
      pass: 'sofia123'
    },
    { 
      email: 'miguel@user.com', 
      tipo: 'usuario', 
      nombre: 'Miguel', 
      apellido: 'Garcia', 
      pass: 'miguel123'
    }
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
