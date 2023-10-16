import { Component, Input } from "@angular/core";
import { ListarDespesaViewModel } from "../models/listar-despesa.view-model";
import { dateFormatter, priceFormatter } from "src/app/core/utils/formatador";

@Component({
  selector: "app-card-despesas",
  templateUrl: "./card-despesas.component.html",
  styleUrls: ["./card-despesas.component.css"],
})
export class CardDespesasComponent {
  @Input({ required: true }) despesa!: ListarDespesaViewModel;

  formatadorValor() {
    return priceFormatter.format(this.despesa.valor);
  }
  formatadorData() {
    return dateFormatter.format(new Date(this.despesa.data));
  }
}
