export class ListarCompromissoViewModel {
  assunto: string = "";
  tipoLocal: number = 0;
  link: string = "";
  local: string = "";
  data: string = "";
  horaInicio: string = "";
  horaTermino: string = "";
  contatoId: string = "";
  id: string = "";

  constructor(
    assunto: string,
    tipoLocal: number,
    link: string,
    local: string,
    data: string,
    horaInicio: string,
    horaTermino: string,
    contatoId: string,
    id: string
  ) {
    this.assunto = assunto;
    this.tipoLocal = tipoLocal;
    this.link = link;
    this.local = local;
    this.data = data;
    this.horaInicio = horaInicio;
    this.horaTermino = horaTermino;
    this.contatoId = contatoId;
    this.id = id;
  }
}
