import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormsCategoriaViewModel } from "../models/forms-categoria.view-model";
import { CategoriasService } from "../services/categorias.service";

@Component({
  selector: "app-editar-categorias",
  templateUrl: "./editar-categorias.component.html",
  styleUrls: ["./editar-categorias.component.css"],
})
export class EditarCategoriasComponent implements OnInit {
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
    this.form.patchValue(this.categoriaVM);
  }

  gravar() {
    if (this.form.invalid) {
      return;
    }

    const id = this.route.snapshot.paramMap.get("id");
    if (!id) return;

    this.categoriaVM = this.form.value;
    this.categoriasService.editar(id, this.categoriaVM).subscribe({
      next: (res: FormsCategoriaViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: any) {
    this.toastService.success(
      `O compromisso "${res.titulo} foi cadastrado com sucesso!"`,
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

  campoEstaInvalido(tipo: string): boolean {
    return this.form.get(tipo)!.touched && this.form.get(tipo)!.invalid;
  }
}
