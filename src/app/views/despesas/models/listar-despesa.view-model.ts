import { FormaPagamentoDespesaEnum } from "../enum/formaPagamentoDespesaEnum";

export class ListarDespesaViewModel {
  id: string = "";
  descricao: string = "";
  data: string = "";
  formaPagamento: FormaPagamentoDespesaEnum = 0;
  valor: number = 0;

  constructor(
    descricao: string,
    data: string,
    formaPagamento: FormaPagamentoDespesaEnum,
    valor: number,
    id: string
  ) {
    (this.descricao = descricao),
      (this.data = data),
      (this.formaPagamento = formaPagamento),
      (this.id = id);
    this.valor = valor;
  }
}
