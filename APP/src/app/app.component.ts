import { Component } from '@angular/core';
import { Page } from './interfaces/page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public tipoUsuario?: string;
  public emailUsuario?: string;
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}

  ngOnInit() {
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.configSideMenu();
    } else {

    }
  }

  configSideMenu() {
    if (this.tipoUsuario === 'admin') {
      this.appPages = [
        {title: 'Dashboard', url:'/admin-dashboard',icon:'home'},
        {title: 'Administrar Usuarios', url:'/admin-users',icon:'people'},
        {title: 'Cerrar Sesión', url:'/login',icon:'log-out'},
      ]
    } else if (this.tipoUsuario === 'usuario') {
      this.appPages = [
        {title: 'Dashboard', url:'/usuario-dashboard',icon:'home'},
        {title: 'Perfil', url:'/perfil',icon:'settings'},
        {title: 'Cerrar Sesión', url:'/login',icon:'log-out'},
      ]
    } else {
      this.appPages = [
        {title: 'Login', url:'/login',icon:'log-out'},
        {title: 'Registrarse', url:'/register',icon:'log-out'},
      ]
    }
  }

}
