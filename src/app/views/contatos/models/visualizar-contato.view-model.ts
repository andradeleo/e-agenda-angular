export class VisualizarContatoViewModel {
  nome: string = "";
  telefone: string = "";
  email: string = "";
  cargo: string = "";
  empresa: string = "";
  id: string = "";

  constructor(
    nome: string,
    telefone: string,
    email: string,
    cargo: string,
    empresa: string,
    id: string
  ) {
    (this.nome = nome),
      (this.telefone = telefone),
      (this.email = email),
      (this.cargo = cargo),
      (this.empresa = empresa);
    this.id = id;
  }
}
