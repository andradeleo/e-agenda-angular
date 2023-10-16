import { HttpErrorResponse } from "@angular/common/http";
import { v4 as uuidv4 } from "uuid";
import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormsTarefaViewModel } from "../models/form-tarefas.view-model";
import { TarefasService } from "../services/tarefas.service";
import { FormsItensTarefaViewModel } from "../models/form-itensTarefa.view-model";
import { StatusItemTarefa } from "../enum/StatusItemTarefa";

@Component({
  selector: "app-editar-tarefas",
  templateUrl: "./editar-tarefas.component.html",
  styleUrls: ["./editar-tarefas.component.css"],
})
export class EditarTarefasComponent {
  form!: FormGroup;
  tarefaVM!: FormsTarefaViewModel;
  itens: FormsItensTarefaViewModel[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tarefaService: TarefasService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {}

  marcarItemComoConcluido(itemParaConcluir: FormsItensTarefaViewModel) {
    const { itens } = this.tarefaVM;
    const item = itens.find((item) => item.id == itemParaConcluir.id);
    if (!item) return;

    item.concluido = true;
    this.itens.push(item);
  }

  excluirItem(itemParaConcluir: FormsItensTarefaViewModel) {
    const { itens } = this.tarefaVM;
    const item = itens.find((item) => item.id == itemParaConcluir.id);
    if (!item) return;

    item.status = StatusItemTarefa.REMOVIDO;
    this.itens.push(item);
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
    const id = this.route.snapshot.paramMap.get("id");

    if (!id) return;

    this.tarefaService.editar(id, this.tarefaVM).subscribe({
      next: (res: FormsTarefaViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

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
    this.form = this.formBuilder.group({
      titulo: new FormControl("", [Validators.required]),
      prioridade: new FormControl(0, [Validators.required]),
      itens: new FormControl([]),
    });

    this.tarefaVM = this.route.snapshot.data["tarefa"];
    this.form.patchValue(this.tarefaVM);
    this.form.get("itens")?.setValue("");
  }

  campoEstaInvalido(tipo: string) {
    return this.form.get(tipo)!.touched && this.form.get(tipo)!.invalid;
  }
}
