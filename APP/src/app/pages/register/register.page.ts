import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  accountType: string = 'usuario';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private toastController: ToastController,
    private authService: AuthService,
    private menuController: MenuController,
    private firestore: AngularFirestore
  ) 
  {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      repass: ['', [Validators.required, Validators.minLength(6)]],
      accountType: ['', [Validators.required]]
    });
  }

  emailValue : string = ' ';
  passValue : string = ' ';
  nombreValue : string = ' ';
  apellidoValue : string = ' ';

  ngOnInit() {
    this.menuController.enable(true);
  }

  async register() {
    const email = this.registerForm.get('email')?.value.trim() || '';
    const pass = this.registerForm.get('pass')?.value.trim() || '';
    const repass = this.registerForm.get('repass')?.value || '';
    const accountType = this.registerForm.get('accountType')?.value || 'usuario'; // Capturar el tipo de cuenta
    
    if (pass !== repass) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }
  
    try {
      const aux = await this.authService.register(email, pass);
      const user = aux.user;
  
      if (user) {
        await this.firestore.collection('usuarios').doc(user.uid).set({
          uid: user.uid,
          nombre: this.registerForm.get('firstName')?.value,
          apellido: this.registerForm.get('lastName')?.value,
          email: user.email,
          pass: pass,
          tipo: accountType // Guardar el tipo de cuenta (usuario o conductor)
        });
  
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso!',
          text: 'Cuenta registrada con éxito.',
          confirmButtonText: 'Iniciar sesión',
          heightAuto: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error!',
        text: 'Error al registrar la cuenta.',
        confirmButtonText: 'Reintentar',
        heightAuto: false,
      });
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

  setAccountType(type: string) {
    this.accountType = type;
    this.registerForm.controls['accountType'].setValue(type); // Actualiza el valor del formulario si estás usando formControl
  }
}
