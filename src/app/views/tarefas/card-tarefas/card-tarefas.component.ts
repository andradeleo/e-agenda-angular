import { Component, Input } from "@angular/core";
import { ListarTarefaViewModel } from "../models/listar-tarefa.view-model";
import { dateFormatter } from "src/app/core/utils/formatador";

@Component({
  selector: "app-card-tarefa",
  templateUrl: "./card-tarefas.component.html",
  styleUrls: ["./card-tarefas.component.css"],
})
export class CardTarefasComponent {
  @Input({ required: true }) tarefa!: ListarTarefaViewModel;

  formatadorData() {
    return dateFormatter.format(this.tarefa.data_criacao);
  }
}
