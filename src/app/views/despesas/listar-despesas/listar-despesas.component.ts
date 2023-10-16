import { Component, OnInit } from "@angular/core";
import { ListarDespesaViewModel } from "../models/listar-despesa.view-model";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { FiltroDataDespesa } from "../enum/filtroDataDespesasEnum";
import { DespesasService } from "../services/despesas.service";

@Component({
  selector: "app-listar-despesas",
  templateUrl: "./listar-despesas.component.html",
  styleUrls: ["./listar-despesas.component.css"],
})
export class ListarDespesasComponent implements OnInit {
  despesas: ListarDespesaViewModel[] = [];

  constructor(
    private readonly toastService: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly despesaService: DespesasService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados["despesas"])).subscribe({
      next: (contatos) => this.processarSucesso(contatos),
      error: (erro) => this.processarFalha(erro),
    });
  }

  filtrarPorData(filtro: FiltroDataDespesa) {
    if (filtro == FiltroDataDespesa.ANTIGAS) {
      this.despesaService
        .selecionarDespesasAntigas()
        .subscribe((res) => (this.despesas = res));
    } else if (filtro == FiltroDataDespesa.ULTIMO_MES) {
      this.despesaService
        .selecionarDespesasUltimoMes()
        .subscribe((res) => (this.despesas = res));
    } else {
      this.despesaService
        .selecionarTodos()
        .subscribe((res) => (this.despesas = res));
    }
  }

  processarSucesso(despesas: ListarDespesaViewModel[]) {
    this.despesas = despesas;
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar excluir o contato: ${err.message}`,
      "Error"
    );
  }
}
