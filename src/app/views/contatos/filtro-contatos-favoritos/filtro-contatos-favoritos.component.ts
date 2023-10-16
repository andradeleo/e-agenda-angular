import { Component, EventEmitter, Output } from "@angular/core";
import { FiltroContatos } from "./enums/filtro-favoritos.enum";

@Component({
  selector: "app-filtro-contatos-favoritos",
  templateUrl: "./filtro-contatos-favoritos.component.html",
  styleUrls: ["./filtro-contatos-favoritos.component.css"],
})
export class FiltroContatosFavoritosComponent {
  @Output() onFiltroSelecionado: EventEmitter<FiltroContatos>;
  number: number = 0;

  constructor() {
    this.onFiltroSelecionado = new EventEmitter();
  }

  selecionarTodos() {
    this.number = 0;
    this.onFiltroSelecionado.emit(FiltroContatos.TODOS);
  }

  selecionarFavoritos() {
    this.number = 1;
    this.onFiltroSelecionado.emit(FiltroContatos.FAVORITOS);
  }
}
