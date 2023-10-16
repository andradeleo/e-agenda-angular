import { Component, EventEmitter, Output } from "@angular/core";
import { FiltroDataDespesa } from "../enum/filtroDataDespesasEnum";

@Component({
  selector: "app-filtro-data",
  templateUrl: "./filtro-data.component.html",
  styleUrls: ["./filtro-data.component.css"],
})
export class FiltroDataComponent {
  number: number = 0;
  @Output() onFiltroData: EventEmitter<FiltroDataDespesa>;

  constructor() {
    this.onFiltroData = new EventEmitter();
  }

  selecionarTodos() {
    this.number = 0;
    this.onFiltroData.emit(FiltroDataDespesa.TODOS);
  }

  selecionarAntigas() {
    this.number = 1;
    this.onFiltroData.emit(FiltroDataDespesa.ANTIGAS);
  }

  selecionarUltimoMes() {
    this.number = 2;
    this.onFiltroData.emit(FiltroDataDespesa.ULTIMO_MES);
  }
}
