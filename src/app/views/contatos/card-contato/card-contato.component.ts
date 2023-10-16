import { Component, Input } from "@angular/core";
import { ListarContatoViewModel } from "../models/listar-contato.view-model";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";
import { ToastrService } from "ngx-toastr";
import { ContatosService } from "../services/contatos.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-card-contato",
  templateUrl: "./card-contato.component.html",
  styleUrls: ["./card-contato.component.css"],
})
export class CardContatoComponent {
  @Input({ required: true }) contato!: ListarContatoViewModel;

  constructor(
    private readonly toastService: ToastrService,
    private readonly contatoService: ContatosService
  ) {}

  favoritarContato(contato: ListarContatoViewModel) {
    const { id } = contato;

    if (!id) {
      this.toastService.error(
        `Houve uma falha ao tentar favoritar o contato`,
        "Error"
      );
    }

    this.contatoService.favoritarContato(id).subscribe({
      next: (res: FormsContatoViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsContatoViewModel) {
    this.toastService.success(
      `O contato "${res.nome} foi favoritado com sucesso!"`,
      "Sucesso"
    );
    this.contato.favorito = !this.contato.favorito;
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar editar o contato: ${err.message}`,
      "Error"
    );
  }
}
