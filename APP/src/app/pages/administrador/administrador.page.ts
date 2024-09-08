import { Component, OnInit } from '@angular/core';
import { Conductor } from 'src/app/interfaces/conductor';
import { ConductorService } from 'src/app/services/conductor.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  usuarios: Usuario[] = [];
  conductores: Conductor[] = [];

  constructor(private usuarioService: UsuarioService, private conductorService: ConductorService) {}

  ngOnInit() {
    this.usuarios = this.usuarioService.getUsuario();
    this.conductores = this.conductorService.getConductor();
  }
}
