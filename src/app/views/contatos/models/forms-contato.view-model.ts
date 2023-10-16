export class FormsContatoViewModel {
  nome: string = "";
  telefone: string = "";
  email: string = "";
  cargo: string = "";
  empresa: string = "";

  constructor(
    nome: string,
    telefone: string,
    email: string,
    cargo: string,
    empresa: string
  ) {
    (this.nome = nome),
      (this.telefone = telefone),
      (this.email = email),
      (this.cargo = cargo),
      (this.empresa = empresa);
  }
}
