import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsItensTarefaViewModel } from "../models/form-itensTarefa.view-model";

@Component({
  selector: "app-tabela-itens",
  templateUrl: "./tabela-itens.component.html",
  styleUrls: ["./tabela-itens.component.css"],
})
export class TabelaItensComponent {
  @Input({ required: true }) itens: FormsItensTarefaViewModel[] = [];
  @Output()
  onConcluirItem: EventEmitter<FormsItensTarefaViewModel>;
  @Output()
  onExcluirItem: EventEmitter<FormsItensTarefaViewModel>;

  constructor() {
    this.onConcluirItem = new EventEmitter();
    this.onExcluirItem = new EventEmitter();
  }

  marcarComoConcluido(item: FormsItensTarefaViewModel) {
    this.onConcluirItem.emit(item);
  }

  excluirItem(item: FormsItensTarefaViewModel) {
    this.onExcluirItem.emit(item);
  }
}
