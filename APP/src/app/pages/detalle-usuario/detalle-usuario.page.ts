// detalle-usuario.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Conductor } from 'src/app/interfaces/conductor';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ConductorService } from 'src/app/services/conductor.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.page.html',
  styleUrls: ['./detalle-usuario.page.scss'],
})
export class DetalleUsuarioPage implements OnInit {

  userEmail?: string | null;
  usuario?: Usuario;
  userTipo?: string | null;
  userNombre?: string | null;
  userApellido?: string | null;

  conductor?: Conductor;
  conductorEmail?: string | null;
  conductorRut?: string | null;
  conductorApellido?: string | null;
  conductorNombre?: string | null;
  conductorPatente?: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private conductorService: ConductorService
  ) { }

  ngOnInit() {
    this.userEmail = this.activatedRoute.snapshot.paramMap.get('email');
    if (this.userEmail) {
      this.usuario = this.usuarioService.getUsuarioByEmail(this.userEmail);
      this.conductor = this.conductorService.getConductorByEmail(this.userEmail);

      if (this.usuario) {
        this.userTipo = this.usuario.tipo;
        this.userNombre = this.usuario.nombre;
        this.userApellido = this.usuario.apellido;
      }

      if (this.conductor) {
        this.conductorEmail = this.conductor.email;
        this.conductorRut = this.conductor.rut;
        this.conductorApellido = this.conductor.apellido;
        this.conductorNombre = this.conductor.nombre;
        this.conductorPatente = this.conductor.patente;
      }
    }
  }
}
