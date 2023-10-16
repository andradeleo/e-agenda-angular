import { Component, OnInit } from "@angular/core";
import { CompromissosService } from "../services/compromissos.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ContatosService } from "../../contatos/services/contatos.service";
import { ListarContatoViewModel } from "../../contatos/models/listar-contato.view-model";
import { FormsCompromissoViewModel } from "../models/forms-compromisso.view-model copy";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-inserir-compromissos",
  templateUrl: "./inserir-compromissos.component.html",
  styleUrls: ["./inserir-compromissos.component.css"],
})
export class InserirCompromissosComponent implements OnInit {
  form!: FormGroup;
  contatos: ListarContatoViewModel[] = [];
  compromissoVM!: FormsCompromissoViewModel;

  constructor(
    private readonly compromissosService: CompromissosService,
    private readonly contatosService: ContatosService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl("", Validators.required),
      tipoLocal: new FormControl("", Validators.required),
      link: new FormControl(""),
      local: new FormControl(""),
      data: new FormControl(new Date(), Validators.required),
      horaInicio: new FormControl("08:00", Validators.required),
      horaTermino: new FormControl("09:00", Validators.required),
      contatoId: new FormControl(""),
    });

    this.contatosService
      .selecionarTodos()
      .subscribe((res) => (this.contatos = res));
  }

  gravar() {
    if (this.form.invalid) {
      return;
    }

    this.compromissoVM = this.form.value;
    this.compromissosService.inserir(this.compromissoVM).subscribe({
      next: (res: FormsCompromissoViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsCompromissoViewModel) {
    this.toastService.success(
      `O compromisso "${res.assunto} foi cadastrado com sucesso!"`,
      "Sucesso"
    );
    this.router.navigate(["/compromisso/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar cadastrar o compromisso: ${err.message}`,
      "Error"
    );
    this.router.navigate(["/compromissos/listar"]);
  }

  campoEstaInvalido(tipo: string) {
    return this.form.get(tipo)!.touched && this.form.get(tipo)!.invalid;
  }
}
