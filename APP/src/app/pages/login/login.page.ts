import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  emailValue?: string;
  passValue?: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private toastController: ToastController, 
    private loadingController: LoadingController,
    private usuariosServices: UsuarioService,
    private menuController: MenuController
  ) {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(){
    this.menuController.enable(true);
  }

  async login() {
    if (this.loginForm.invalid) {
      const errorMessages = this.getErrorMessages();
      for (const message of errorMessages) {
        this.showErrorToast(message);
      }
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando.....',
      duration: 2000
    });

    const email = this.emailValue;
    const pass = this.passValue;

    const aux = this.usuariosServices.getUsuario();
    const user = aux.find(aux => aux.email === email && aux.pass === pass);

    if (user) {
      await loading.present();
      localStorage.setItem('usuarioLogin', JSON.stringify(user));

      setTimeout(async() => {
        await loading.dismiss();
        if (user.tipo === 'admin') {
          this.router.navigate(['/administrador']);
        } else if (user.tipo === 'usuario') {
          this.router.navigate(['/home']);
        } 
      }, 2000);
      
    } else {
      this.showErrorToast('Usuario o contraseña incorrecta.');
    }
  }

  getErrorMessages(): string[] {
    const messages: string[] = [];
    if (this.loginForm.get('email')?.hasError('required')) {
      messages.push('El correo es requerido!');
    } else if (this.loginForm.get('email')?.hasError('email')) {
      messages.push('El correo es inválido!');
    }
    if (this.loginForm.get('pass')?.hasError('required')) {
      messages.push('La contraseña es requerida!');
    } else if (this.loginForm.get('pass')?.hasError('minlength')) {
      messages.push('La contraseña tiene como mínimo 6 caracteres!');
    }
    return messages;
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'light'
    });
    await toast.present();
  }

  register(){
    this.router.navigate(['/register']);
  }

  goToResetPassword(){
    this.router.navigate(['/resetpassword']); 
  }

}