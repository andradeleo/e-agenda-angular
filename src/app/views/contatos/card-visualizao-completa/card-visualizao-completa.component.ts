import { Component, Input } from "@angular/core";
import { FormsCompromissoViewModel } from "../../compromissos/models/forms-compromisso.view-model copy";
import { timeFormatter } from "src/app/core/utils/formatador";

@Component({
  selector: "app-card-visualizao-completa",
  templateUrl: "./card-visualizao-completa.component.html",
  styleUrls: ["./card-visualizao-completa.component.css"],
})
export class CardVisualizaoCompletaComponent {
  @Input({ required: true })
  compromisso!: FormsCompromissoViewModel;

  formatarHorario(data: string) {
    return timeFormatter(data);
  }
}
