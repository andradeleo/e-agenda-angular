import { VisualizarItensTarefaViewModel } from "./visualizar-itensTarefa.view-model";

export class VisualizarTarefaViewModel {
  id: string = "";
  titulo: string = "";
  data_criacao: Date;
  data_conclusao: Date;
  quantidade_itens: number = 0;
  percentual_concluido: number = 0;
  prioridade: string = "";
  situacao: string = "";
  itens: VisualizarItensTarefaViewModel[];

  constructor(
    id: string,
    titulo: string,
    data_criacao: Date,
    data_conclusao: Date,
    prioridade: string,
    situacao: string,
    itens: VisualizarItensTarefaViewModel[]
  ) {
    this.id = id;
    this.titulo = titulo;
    this.data_criacao = data_criacao;
    this.data_conclusao = data_conclusao;
    this.prioridade = prioridade;
    this.situacao = situacao;
    this.itens = itens;
  }
}
