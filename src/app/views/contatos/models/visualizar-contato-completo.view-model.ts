import { FormsCompromissoViewModel } from "../../compromissos/models/forms-compromisso.view-model copy";

export class VisualizarContatoCompletoViewModel {
  nome: string = "";
  telefone: string = "";
  email: string = "";
  cargo: string = "";
  empresa: string = "";
  favorito: boolean = false;
  compromissos: FormsCompromissoViewModel[] = [];
  id: string = "";

  constructor(
    nome: string,
    telefone: string,
    email: string,
    cargo: string,
    empresa: string,
    favorito: boolean,
    compromissos: FormsCompromissoViewModel[],
    id: string
  ) {
    (this.nome = nome),
      (this.telefone = telefone),
      (this.email = email),
      (this.cargo = cargo),
      (this.empresa = empresa);
    (this.favorito = favorito), (this.compromissos = compromissos);
    this.id = id;
  }
}
