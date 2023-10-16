import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormsTarefaViewModel } from "../models/form-tarefas.view-model";
import { TarefasService } from "../services/tarefas.service";
import { FormsItensTarefaViewModel } from "../models/form-itensTarefa.view-model";
import { StatusItemTarefa } from "../enum/StatusItemTarefa";

@Component({
  selector: "app-inserir-tarefas",
  templateUrl: "./inserir-tarefas.component.html",
  styleUrls: ["./inserir-tarefas.component.css"],
})
export class InserirTarefasComponent {
  form!: FormGroup;
  tarefaVM!: FormsTarefaViewModel;
  itens: FormsItensTarefaViewModel[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tarefaService: TarefasService,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {}

  inserirItemTarefa() {
    const title = this.form.get("itens")?.value;
    const novoItem = new FormsItensTarefaViewModel(
      uuidv4(),
      title,
      StatusItemTarefa.ADICIONADO,
      false
    );
    this.itens.push(novoItem);
  }

  gravar() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    this.tarefaVM = {
      ...formValue,
      itens: this.itens,
    };

    console.log(this.tarefaVM);

    this.tarefaService.inserir(this.tarefaVM).subscribe({
      next: (res: FormsTarefaViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsTarefaViewModel) {
    this.toastService.success(
      `O contato "${res.titulo} foi cadastrado com sucesso!"`,
      "Sucesso"
    );
    this.router.navigate(["/tarefas/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar cadastrar o contato: ${err.message}`,
      "Error"
    );
    this.router.navigate(["/tarefas/listar"]);
  }

  ngOnInit(): void {
    this.tarefaVM = new FormsTarefaViewModel();
    this.form = this.formBuilder.group({
      titulo: new FormControl("", [Validators.required]),
      prioridade: new FormControl(0, [Validators.required]),
      itens: new FormControl([]),
    });
  }

  campoEstaInvalido(tipo: string) {
    return this.form.get(tipo)!.touched && this.form.get(tipo)!.invalid;
  }
}
