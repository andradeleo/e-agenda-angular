export class ListarTarefaViewModel {
  id: string = "";
  titulo: string = "";
  data_criacao: Date;
  prioridade: string = "";
  situacao: string = "";

  constructor(
    id: string,
    titulo: string,
    data_criacao: Date,
    prioridade: string,
    situacao: string
  ) {
    this.id = id;
    this.titulo = titulo;
    this.data_criacao = data_criacao;
    this.prioridade = prioridade;
    this.situacao = situacao;
  }
}
