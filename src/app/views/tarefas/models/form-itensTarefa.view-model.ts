import { StatusItemTarefa } from "../enum/StatusItemTarefa";

export class FormsItensTarefaViewModel {
  id: string = "";
  titulo: string = "";
  status: StatusItemTarefa = StatusItemTarefa.NENHUM;
  concluido: boolean = false;

  constructor(
    id: string,
    titulo: string,
    status: StatusItemTarefa,
    concluido: boolean
  ) {
    this.id = id;
    this.titulo = titulo;
    this.status = status;
    this.concluido = concluido;
  }
}
