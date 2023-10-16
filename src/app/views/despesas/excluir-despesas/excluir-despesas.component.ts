import { Component, OnInit } from "@angular/core";
import { FormDespesaViewModel } from "../models/forms-despesa.view-model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { DespesasService } from "../services/despesas.service";

@Component({
  selector: "app-excluir-despesas",
  templateUrl: "./excluir-despesas.component.html",
  styleUrls: ["./excluir-despesas.component.css"],
})
export class ExcluirDespesasComponent implements OnInit {
  form!: FormGroup;
  despesaVM!: FormDespesaViewModel;

  constructor(
    private readonly despesaService: DespesasService,
    private readonly toastService: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl("", [Validators.required]),
      data: new FormControl("", [Validators.required]),
      formaPagamento: new FormControl("", [Validators.required]),
      valor: new FormControl("", [Validators.required]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });

    this.despesaVM = this.route.snapshot.data["despesa"];
  }

  gravar() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) return;

    this.despesaService.excluir(id).subscribe({
      next: (res: FormDespesaViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: any) {
    this.toastService.success(
      `O compromisso foi cadastrado com sucesso!"`,
      "Sucesso"
    );
    this.router.navigate(["/despesas/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar cadastrar o compromisso: ${err.message}`,
      "Error"
    );
    this.router.navigate(["/despesas/listar"]);
  }
}
