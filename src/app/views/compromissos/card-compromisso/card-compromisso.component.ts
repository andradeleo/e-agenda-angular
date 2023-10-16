import { Component, Input } from "@angular/core";
import { ListarCompromissoViewModel } from "../models/listar-compromisso.view-model";
import { dateFormatter, timeFormatter } from "src/app/core/utils/formatador";

@Component({
  selector: "app-card-compromisso",
  templateUrl: "./card-compromisso.component.html",
  styleUrls: ["./card-compromisso.component.css"],
})
export class CardCompromissoComponent {
  @Input({ required: true }) compromissos!: ListarCompromissoViewModel;

  formatarHorario(date: string) {
    return timeFormatter(date);
  }
}
