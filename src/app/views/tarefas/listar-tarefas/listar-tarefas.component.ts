import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs";
import { ListarTarefaViewModel } from "../models/listar-tarefa.view-model";

@Component({
  selector: "app-listar-tarefas",
  templateUrl: "./listar-tarefas.component.html",
  styleUrls: ["./listar-tarefas.component.css"],
})
export class ListarTarefasComponent {
  tarefas: ListarTarefaViewModel[] = [];

  constructor(
    private readonly toastService: ToastrService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados["tarefas"])).subscribe({
      next: (tarefas) => this.processarSucesso(tarefas),
      error: (erro) => this.processarFalha(erro),
    });
  }

  processarSucesso(tarefas: ListarTarefaViewModel[]) {
    this.tarefas = tarefas;
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar excluir o contato: ${err.message}`,
      "Error"
    );
  }
}
