import { Component, OnInit } from "@angular/core";
import { VisualizarContatoViewModel } from "../models/visualizar-contato.view-model";
import { ContatosService } from "../services/contatos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-excluir-contato",
  templateUrl: "./excluir-contato.component.html",
  styleUrls: ["./excluir-contato.component.css"],
})
export class ExcluirContatoComponent implements OnInit {
  contatoVM!: VisualizarContatoViewModel;
  idSelecionado!: string | null;

  constructor(
    private readonly contatoService: ContatosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {
    this.contatoVM = new VisualizarContatoViewModel("", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.contatoVM = this.route.snapshot.data["contato"];
  }

  gravar() {
    const id = this.route.snapshot.paramMap.get("id");

    if (!id) return;
    this.contatoService.excluir(id).subscribe({
      next: (res: FormsContatoViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsContatoViewModel) {
    this.toastService.success(
      `O contato "${res.nome} foi excluído com sucesso!"`,
      "Sucesso"
    );
    this.router.navigate(["/contatos/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar excluir o contato: ${err.message}`,
      "Error"
    );
    this.router.navigate(["/contatos/listar"]);
  }
}
