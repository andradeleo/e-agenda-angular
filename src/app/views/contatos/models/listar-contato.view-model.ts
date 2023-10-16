export class ListarContatoViewModel {
  nome: string = "";
  telefone: string = "";
  cargo: string = "";
  empresa: string = "";
  id: string = "";
  favorito: boolean = false;

  constructor(
    nome: string,
    telefone: string,
    cargo: string,
    empresa: string,
    id: string,
    favorito: boolean
  ) {
    (this.nome = nome),
      (this.telefone = telefone),
      (this.cargo = cargo),
      (this.empresa = empresa);
    this.id = id;
    this.favorito = favorito;
  }
}
