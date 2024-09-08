import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage {
  emailValue?: string;
  verificationCode?: string;
  generatedCode?: string;
  newPassword?: string;

  constructor(private usuarioService: UsuarioService, private toastController: ToastController, private Router: Router) {}

  async sendVerificationCode() {
    const user = this.usuarioService.getUsuario().find(u => u.email === this.emailValue);
    if (user) {
      this.generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const toast = await this.toastController.create({
        message: `Tu código es: ${this.generatedCode}`,
        duration: 3000,
        color: 'warning',
        position: 'bottom'
      });
      await toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Correo no encontrado',
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
    }
  }

  async resetPassword() {
    if (this.verificationCode === this.generatedCode) {
      const user = this.usuarioService.getUsuario().find(u => u.email === this.emailValue);
      if (user) {
        user.pass = this.newPassword;
        const toast = await this.toastController.create({
          message: 'Contraseña actualizada correctamente',
          duration: 3000,
          color: 'success',
          position: 'bottom'
        });
        await toast.present();
        this.Router.navigate(['/login']);
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Código de verificación incorrecto',
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
    }
  }
}
