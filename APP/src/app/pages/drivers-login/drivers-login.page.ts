import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';

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

  goToResetPassword(){
    this.router.navigate(['/resetpassword']); 
  }

  clientesVersion(){
    this.router.navigate(['/login']);
  }

}
