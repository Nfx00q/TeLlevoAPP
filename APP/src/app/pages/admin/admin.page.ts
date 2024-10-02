import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  usuarios: any[] = [];
  selectedUsuario: any;

  constructor(private authService: AuthService, 
    private alertController: AlertController, 
    private modalController: ModalController, 
    private menuController: MenuController,
    private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
    this.menuController.enable(false);
  }

  getUsers() {
    this.authService.getUsers().subscribe(users => {
      this.usuarios = users;
    });
  }

  async logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  async editarUsuario(usuario: any) {
    const modal = await this.modalController.create({
      component: EditModalComponent,
      componentProps: { usuario } // Pasa el usuario al modal
    });

    modal.onDidDismiss().then(async (data) => {
      if (data.data) {
        // Si se devuelve updatedData, llama al método para editar el usuario
        await this.authService.editUser(usuario.uid, data.data);
        this.getUsers(); // Actualiza la lista de usuarios después de editar
      }
    });

    return await modal.present();
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
