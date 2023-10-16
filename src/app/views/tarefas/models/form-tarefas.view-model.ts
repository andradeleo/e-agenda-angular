import { PrioridadeTarefa } from "../enum/PrioridadeTarefaEnum";
import { FormsItensTarefaViewModel } from "./form-itensTarefa.view-model";

export class FormsTarefaViewModel {
  titulo: string = "";
  prioridade: PrioridadeTarefa = PrioridadeTarefa.BAIXA;
  itens: FormsItensTarefaViewModel[] = [];
}
