import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.page.html',
  styleUrls: ['./config-page.page.scss'],
})
export class ConfigPagePage implements OnInit {

  usuario: any;

  constructor(private menuController: MenuController, private router: Router) { }

  ngOnInit() {
    this.menuController.enable(false);
  }

  goToAccount(usuario: any) {
    this.router.navigate(['/config-page/account'], {
      queryParams: {
        usuario: JSON.stringify(usuario)
      }
    });
  }

}
