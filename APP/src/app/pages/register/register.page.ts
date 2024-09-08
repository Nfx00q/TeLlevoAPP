import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private toastController: ToastController, 
    private loadingController: LoadingController,
    private usuariosServices: UsuarioService,
    private menuController: MenuController
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      repass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.menuController.enable(true);
  }

  async register() {
    const email = this.registerForm.get('email')?.value || '';
    const pass = this.registerForm.get('pass')?.value || '';
    const repass = this.registerForm.get('repass')?.value || '';
    const firstName = this.registerForm.get('firstName')?.value || '';
    const lastName = this.registerForm.get('lastName')?.value || '';

    if (pass !== repass) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    let accountType = 'usuario';
    
    const newUser: Usuario = {
      email,
      pass,
      nombre: firstName,
      apellido: lastName,
      tipo: accountType
    };

    this.usuariosServices.addUsuario(newUser);

    const toast = await this.toastController.create({
      message: 'Usuario registrado con éxito.',
      duration: 2000,
      color: 'success'
    });
    toast.present();

    this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login']);
  }
}
