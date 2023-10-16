export class VisualizarItensTarefaViewModel {
  titulo: string = "";
  situacao: string = "";

  constructor(titulo: string, situacao: string) {
    this.titulo = titulo;
    this.situacao = situacao;
  }
}
