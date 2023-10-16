import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ContatosService } from "../services/contatos.service";
import { Router } from "@angular/router";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-inserir-contato",
  templateUrl: "./inserir-contato.component.html",
  styleUrls: ["./inserir-contato.component.css"],
})
export class InserirContatoComponent implements OnInit {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contatoService: ContatosService,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {}

  gravar() {
    if (this.form.invalid) {
      const erros = this.form.validate();
      for (let erro of erros) {
        this.toastService.warning(erro);
      }
      return;
    }

    this.contatoVM = this.form.value;
    this.contatoService.inserir(this.contatoVM).subscribe({
      next: (res: FormsContatoViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsContatoViewModel) {
    this.toastService.success(
      `O contato "${res.nome} foi cadastrado com sucesso!"`,
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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      telefone: new FormControl("", [Validators.required]),
      cargo: new FormControl("", [Validators.required]),
      empresa: new FormControl("", [Validators.required]),
    });
  }

  campoEstaInvalido(tipo: string) {
    return this.form.get(tipo)!.touched && this.form.get(tipo)!.invalid;
  }

  get email() {
    return this.form.get("email");
  }
}
