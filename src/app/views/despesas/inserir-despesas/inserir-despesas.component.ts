import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CategoriasService } from "../../categorias/services/categorias.service";
import { ListarCategoriaViewModel } from "../../categorias/models/listar-categoria.view-model";
import { FormDespesaViewModel } from "../models/forms-despesa.view-model";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DespesasService } from "../services/despesas.service";

@Component({
  selector: "app-inserir-despesas",
  templateUrl: "./inserir-despesas.component.html",
  styleUrls: ["./inserir-despesas.component.css"],
})
export class InserirDespesasComponent implements OnInit {
  form!: FormGroup;
  despesaVM!: FormDespesaViewModel;
  categorias: ListarCategoriaViewModel[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoriasService: CategoriasService,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private readonly despesasService: DespesasService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl("", [Validators.required]),
      data: new FormControl("", [Validators.required]),
      formaPagamento: new FormControl("", [Validators.required]),
      valor: new FormControl("", [Validators.required]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });
    this.categoriasService
      .selecionarTodos()
      .subscribe((res) => (this.categorias = res));
  }

  gravar() {
    if (this.form.invalid) {
      const erros = this.form.validate();
      for (let erro of erros) {
        this.toastService.warning(erro);
      }
      return;
    }

    this.despesaVM = this.form.value;

    this.despesasService.inserir(this.despesaVM).subscribe({
      next: (res: FormDespesaViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormDespesaViewModel) {
    this.toastService.success(
      `O contato "${res.descricao} foi cadastrado com sucesso!"`,
      "Sucesso"
    );
    this.router.navigate(["/contatos/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar cadastrar o contato: ${err.message}`,
      "Error"
    );
    this.router.navigate(["/contatos/listar"]);
  }

  campoEstaInvalido(tipo: string) {
    return this.form.get(tipo)!.touched && this.form.get(tipo)!.invalid;
  }
}
