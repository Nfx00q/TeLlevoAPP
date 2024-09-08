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
      img_usuario: 'assets/usuarios/carlos.jpg',
      email: 'carlos@admin.com', 
      tipo: 'admin', 
      nombre: 'Carlos', 
      apellido: 'Martinez', 
      pass: 'carlos123'
    },
    { 
      img_usuario: 'assets/usuarios/julio.jpg',
      email: 'julio@admin.com', 
      tipo: 'admin', 
      nombre: 'Julio', 
      apellido: 'Lopez', 
      pass: 'julio123'
    },
  ];
  
  

  getUsuario(){
    return this.usuarios;
  }

  getUsuarioByEmail(email: string): Usuario | undefined {
    return this.usuarios.find(user => user.email === email);
  }
  
  addUsuario(usuario: Usuario){
    this.usuarios.push(usuario)
  }

  deleteUsuario(){

  }

  updateUsuario(){

  }
}
