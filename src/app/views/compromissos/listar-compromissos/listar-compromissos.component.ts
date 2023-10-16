import { Component } from "@angular/core";
import { CompromissosService } from "../services/compromissos.service";
import { ListarCompromissoViewModel } from "../models/listar-compromisso.view-model";
import { FiltroDataCompromissos } from "../enum/filtroDataCompromissosEnum";

@Component({
  selector: "app-listar-compromissos",
  templateUrl: "./listar-compromissos.component.html",
  styleUrls: ["./listar-compromissos.component.css"],
})
export class ListarCompromissosComponent {
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(private readonly compromissoService: CompromissosService) {}

  ngOnInit(): void {
    this.compromissoService.selecionarTodos().subscribe((res) => {
      this.compromissos = res;
    });
  }
}
