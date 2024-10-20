import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  emailValue: string = '';
  passValue: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private loadingController: LoadingController,
    private menuController: MenuController,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(){
    this.menuController.enable(false);
  }
  
  async login() {
    try {
      const loading = await this.loadingController.create({
        message: 'Cargando.....',
        duration: 2000
      });
  
      const email = this.emailValue;
      const pass = this.passValue;
  
      const aux = await this.authService.login(email as string, pass as string);
  
      if (aux.user) {
        const usuarioLogin = await this.firestore.collection('usuarios').doc(aux.user.uid).get().toPromise();
        const usuarioData = usuarioLogin?.data() as Usuario;
  
        if (usuarioData.disabled) {
          Swal.fire({
            icon: 'error',
            title: 'Cuenta deshabilitada',
            text: 'Tu cuenta está deshabilitada. Por favor, contacta al soporte.',
            confirmButtonText: 'OK',
            heightAuto: false
          });
          return;
        }
  
        localStorage.setItem('usuarioLogin', email as string);
        (await loading).present();
  
        setTimeout(async () => {
          (await loading).dismiss();
          if (usuarioData.tipo === 'admin') {
            this.router.navigate(['/admin']);
          } else if (usuarioData.tipo === 'usuario') {
            this.router.navigate(['/home']);
          } else if (usuarioData.tipo === 'conductor') {
            Swal.fire({
              icon: 'info',
              title: 'Login',
              text: 'Detectamos que eres conductor, bienvenid@',
              confirmButtonText: 'OK',
              heightAuto: false
            });
            this.router.navigate(['/drivers']);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al iniciar sesión.',
        confirmButtonText: 'OK',
        heightAuto: false
      });
      this.emailValue = '';
      this.passValue = '';
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

  register(){
    this.router.navigate(['/register']);
  }

  goToResetPassword(){
    this.router.navigate(['/resetpassword']); 
  }

  driversVersion(){
    this.router.navigate(['/drivers-login']);
  }

}