export class ListarCategoriaViewModel {
  id: string = "";
  titulo: string = "";

  constructor(titulo: string, id: string) {
    this.id = id;
    this.titulo = titulo;
  }
}
