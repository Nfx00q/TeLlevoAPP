import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  usuario: any;

  constructor(private menuController: MenuController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menuController.enable(false);
    this.route.queryParams.subscribe(params => {
      if (params && params['usuario']) {
        this.usuario = JSON.parse(params['usuario']);
      }
    });
  }

}
