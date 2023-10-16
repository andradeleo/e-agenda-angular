import { Component } from "@angular/core";
import { ListarCategoriaViewModel } from "../models/listar-categoria.view-model";
import { CategoriasService } from "../services/categorias.service";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs";

@Component({
  selector: "app-listar-categorias",
  templateUrl: "./listar-categorias.component.html",
  styleUrls: ["./listar-categorias.component.css"],
})
export class ListarCategoriasComponent {
  categorias: ListarCategoriaViewModel[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados["categorias"])).subscribe({
      next: (contatos) => this.processarSucesso(contatos),
      error: (erro) => this.processarFalha(erro),
    });
  }

  processarSucesso(categorias: ListarCategoriaViewModel[]) {
    this.categorias = categorias;
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar excluir o contato: ${err.message}`,
      "Error"
    );
  }
}
