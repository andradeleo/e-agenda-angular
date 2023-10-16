import { Component } from "@angular/core";
import { VisualizarTarefaViewModel } from "../models/visualizar-tarefa.view-model";
import { TarefasService } from "../services/tarefas.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormsContatoViewModel } from "../../contatos/models/forms-contato.view-model";
import { VisualizarContatoViewModel } from "../../contatos/models/visualizar-contato.view-model";
import { FormsTarefaViewModel } from "../models/form-tarefas.view-model";

@Component({
  selector: "app-excluir-tarefas",
  templateUrl: "./excluir-tarefas.component.html",
  styleUrls: ["./excluir-tarefas.component.css"],
})
export class ExcluirTarefasComponent {
  tarefaVM!: VisualizarTarefaViewModel;

  constructor(
    private readonly tarefasService: TarefasService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {
    this.tarefaVM = new VisualizarTarefaViewModel(
      "",
      "",
      new Date(),
      new Date(),
      "",
      "",
      []
    );
  }

  ngOnInit(): void {
    this.tarefaVM = this.route.snapshot.data["tarefa"];
  }

  gravar() {
    const id = this.route.snapshot.paramMap.get("id");

    if (!id) return;
    this.tarefasService.excluir(id).subscribe({
      next: (res: FormsTarefaViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsTarefaViewModel) {
    this.toastService.success(`A tarefa foi excluído com sucesso!"`, "Sucesso");
    this.router.navigate(["/tarefas/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar excluir o contato: ${err.message}`,
      "Error"
    );
    this.router.navigate(["/tarefas/listar"]);
  }
}
