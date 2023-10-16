import { Component, OnInit } from "@angular/core";
import { ContatosService } from "../services/contatos.service";
import { ListarContatoViewModel } from "../models/listar-contato.view-model";
import { FiltroContatos } from "../filtro-contatos-favoritos/enums/filtro-favoritos.enum";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs";

@Component({
  selector: "app-listar-contatos",
  templateUrl: "./listar-contatos.component.html",
  styleUrls: ["./listar-contatos.component.css"],
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[] = [];

  constructor(
    private readonly contatoService: ContatosService,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados["contatos"])).subscribe({
      next: (contatos) => this.processarSucesso(contatos),
      error: (erro) => this.processarFalha(erro),
    });
  }

  processarSucesso(contatos: ListarContatoViewModel[]) {
    this.contatos = contatos;
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar excluir o contato: ${err.message}`,
      "Error"
    );
  }

  filtrarContatos(filtro: FiltroContatos) {
    this.contatoService
      .selecionarTodos(filtro)
      .subscribe((res) => (this.contatos = res));
  }
}
