import { Component, Input } from "@angular/core";

@Component({
  selector: "app-mensagem-sem-registro",
  templateUrl: "./mensagem-sem-registro.component.html",
  styleUrls: ["./mensagem-sem-registro.component.css"],
})
export class MensagemSemRegistroComponent {
  @Input() mensagem!: string;
}
