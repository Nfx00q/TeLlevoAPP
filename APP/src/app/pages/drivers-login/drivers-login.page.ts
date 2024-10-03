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
  selector: 'app-drivers-login',
  templateUrl: './drivers-login.page.html',
  styleUrls: ['./drivers-login.page.scss'],
})
export class DriversLoginPage implements OnInit {

  constructor(private router: Router,
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

  loginForm: FormGroup;
  emailValue: string = '';
  passValue: string = '';

  ngOnInit() {
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

        localStorage.setItem('usuarioLogin',email as string);
        (await loading).present();
  
        setTimeout(async() => {
          (await loading).dismiss();
          if (usuarioData.tipo === 'conductor') {
            this.router.navigate(['/drivers']);
          } else {
            Swal.fire({
              icon:'error',
              title:'Error',
              text: 'Tu cuenta no esta registrada como conductor',
              confirmButtonText: 'OK',
              heightAuto: false
            });
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      Swal.fire({
        icon:'error',
        title:'Error',
        text: 'Hubo un error al iniciar sesión.',
        confirmButtonText: 'OK',
        heightAuto: false
      });
      this.emailValue = '';
      this.passValue = '';
    }
  }

  goToResetPassword(){
    this.router.navigate(['/resetpassword']); 
  }

  clientesVersion(){
    this.router.navigate(['/login']);
  }

}
