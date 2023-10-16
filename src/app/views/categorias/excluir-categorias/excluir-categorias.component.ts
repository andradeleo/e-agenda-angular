import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FormsCategoriaViewModel } from "../models/forms-categoria.view-model";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CategoriasService } from "../services/categorias.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-excluir-categorias",
  templateUrl: "./excluir-categorias.component.html",
  styleUrls: ["./excluir-categorias.component.css"],
})
export class ExcluirCategoriasComponent implements OnInit {
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel;
  idSelecionado: string | null = "";

  constructor(
    private readonly categoriasService: CategoriasService,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl("", Validators.required),
    });

    this.categoriaVM = this.route.snapshot.data["categoria"];
  }

  gravar() {
    const id = this.route.snapshot.paramMap.get("id");

    if (!id) return;

    this.categoriasService.excluir(id).subscribe({
      next: (res: FormsCategoriaViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: any) {
    this.toastService.success(
      `O compromisso foi cadastrado com sucesso!"`,
      "Sucesso"
    );
    this.router.navigate(["/categorias/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar cadastrar o compromisso: ${err.message}`,
      "Error"
    );
    this.router.navigate(["/categorias/listar"]);
  }
}
