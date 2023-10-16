import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VisualizarContatoCompletoViewModel } from "../models/visualizar-contato-completo.view-model";

@Component({
  selector: "app-visualizar-contato",
  templateUrl: "./visualizar-contato.component.html",
  styleUrls: ["./visualizar-contato.component.css"],
})
export class VisualizarContatoComponent implements OnInit {
  contatoVM!: VisualizarContatoCompletoViewModel;

  constructor(private readonly route: ActivatedRoute) {
    this.contatoVM = new VisualizarContatoCompletoViewModel(
      "",
      "",
      "",
      "",
      "",
      false,
      [],
      ""
    );
  }

  ngOnInit(): void {
    this.contatoVM = this.route.snapshot.data["contato"];
    console.log(this.contatoVM);
  }
}
