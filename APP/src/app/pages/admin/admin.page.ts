import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  usuarios: any[] = [];

  constructor(private authService: AuthService, private alertController: AlertController) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers().subscribe(users => {
      this.usuarios = users;
    });
  }

  editarUsuario(usuario: any) {
    // TODO:
  }

  async eliminarUsuario(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar al usuario?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.authService.deleteUser(usuario.uid)
              .then(() => {
                console.log('Usuario eliminado correctamente');
              })
              .catch((error) => {
                console.error('Error al eliminar usuario:', error);
              });
          }
        }
      ]
    });

    await alert.present();
  }
}
