import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  usuario: any;

  constructor(private menuController: MenuController, private route: ActivatedRoute, private toastController: ToastController, private authService: AuthService) { }

  ngOnInit() {
    this.menuController.enable(false);
    this.route.queryParams.subscribe(params => {
      if (params && params['usuario']) {
        try {
          this.usuario = JSON.parse(params['usuario']);
          console.log("Usuario en account-page:", this.usuario);
        } catch (error) {
          console.error("Error al parsear JSON:", error);
        }
      }
    });
  }

  async saveChanges() {
    try {
      await this.authService.editUser(this.usuario.uid, {
        telefono: this.usuario.telefono,
        img_usuario: this.usuario.img_usuario,
        edad: this.usuario.edad
      });
      
      const toast = await this.toastController.create({
        message: 'Cambios guardados exitosamente',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al guardar los cambios',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      console.error('Error actualizando datos:', error);
    }
  }

}
