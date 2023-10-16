import { FormaPagamentoDespesaEnum } from "../enum/formaPagamentoDespesaEnum";

export class FormDespesaViewModel {
  descricao: string = "";
  data: string = "";
  formaPagamento: FormaPagamentoDespesaEnum = 0;
  valor: number = 0;
  categoriasSelecionadas: string[] = [];

  constructor(
    descricao: string,
    data: string,
    formaPagamento: FormaPagamentoDespesaEnum,
    valor: number,
    categoriasSelecionadas: string[]
  ) {
    (this.descricao = descricao),
      (this.data = data),
      (this.formaPagamento = formaPagamento),
      (this.categoriasSelecionadas = categoriasSelecionadas);
    this.valor = valor;
  }
}
