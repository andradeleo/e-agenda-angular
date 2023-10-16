import { Component } from "@angular/core";
import { CompromissosService } from "../services/compromissos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ListarContatoViewModel } from "../../contatos/models/listar-contato.view-model";
import { FormsCompromissoViewModel } from "../models/forms-compromisso.view-model copy";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-excluir-compromissos",
  templateUrl: "./excluir-compromissos.component.html",
  styleUrls: ["./excluir-compromissos.component.css"],
})
export class ExcluirCompromissosComponent {
  contatos: ListarContatoViewModel[] = [];
  idSelecionado!: string | null;
  compromissoVM!: FormsCompromissoViewModel;

  constructor(
    private readonly compromissoService: CompromissosService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {
    this.compromissoVM = new FormsCompromissoViewModel(
      "",
      0,
      "",
      "",
      "",
      "",
      "",
      ""
    );
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get("id");
    if (!this.idSelecionado) return;

    this.compromissoService
      .selecionarPorId(this.idSelecionado)
      .subscribe((res) => {
        this.compromissoVM = res;
      });
  }

  gravar() {
    if (!this.idSelecionado) return;
    this.compromissoService.excluir(this.idSelecionado).subscribe({
      next: (res: FormsCompromissoViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsCompromissoViewModel) {
    this.toastService.success(
      `O compromisso foi excluído com sucesso!"`,
      "Sucesso"
    );
    this.router.navigate(["/compromissos/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar excluir o compromisso: ${err.message}`,
      "Error"
    );
    this.router.navigate(["/compromissos/listar"]);
  }
}
