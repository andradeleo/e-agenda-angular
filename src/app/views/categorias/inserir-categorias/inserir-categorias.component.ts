import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormsCategoriaViewModel } from "../models/forms-categoria.view-model";
import { CategoriasService } from "../services/categorias.service";

@Component({
  selector: "app-inserir-categorias",
  templateUrl: "./inserir-categorias.component.html",
  styleUrls: ["./inserir-categorias.component.css"],
})
export class InserirCategoriasComponent implements OnInit {
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastrService,
    private readonly categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl("", Validators.required),
    });
  }

  gravar() {
    if (this.form.invalid) {
      return;
    }

    this.categoriaVM = this.form.value;
    this.categoriasService.inserir(this.categoriaVM).subscribe({
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
