import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormDespesaViewModel } from "../models/forms-despesa.view-model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriasService } from "../../categorias/services/categorias.service";
import { ListarCategoriaViewModel } from "../../categorias/models/listar-categoria.view-model";
import { DespesasService } from "../services/despesas.service";

@Component({
  selector: "app-editar-despesas",
  templateUrl: "./editar-despesas.component.html",
  styleUrls: ["./editar-despesas.component.css"],
})
export class EditarDespesasComponent implements OnInit {
  form!: FormGroup;
  despesaVM!: FormDespesaViewModel;
  categorias: ListarCategoriaViewModel[] = [];

  constructor(
    private readonly toastService: ToastrService,
    private readonly formBuilder: FormBuilder,
    private readonly categoriasService: CategoriasService,
    private readonly router: Router,
    private readonly despesasService: DespesasService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoriasService
      .selecionarTodos()
      .subscribe((res) => (this.categorias = res));

    this.form = this.formBuilder.group({
      descricao: new FormControl("", [Validators.required]),
      data: new FormControl("", [Validators.required]),
      formaPagamento: new FormControl("", [Validators.required]),
      valor: new FormControl("", [Validators.required]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });

    const res = this.route.snapshot.data["despesa"];
    const { data } = res;
    let novaData = new Date(data);
    const mes =
      novaData.getMonth() < 10
        ? `0${novaData.getMonth()}`
        : novaData.getMonth();
    const dataFormatada = `${novaData.getFullYear()}-${mes}-${novaData.getDate()}`;
    const novaRes = {
      ...res,
      data: dataFormatada,
    };
    this.despesaVM = novaRes;
    this.form.patchValue(this.despesaVM);
  }

  gravar() {
    if (this.form.invalid) {
      const erros = this.form.validate();
      for (let erro of erros) {
        this.toastService.warning(erro);
      }
      return;
    }

    const id = this.route.snapshot.paramMap.get("id");
    if (!id) return;

    this.despesaVM = this.form.value;

    this.despesasService.editar(id, this.despesaVM).subscribe({
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
