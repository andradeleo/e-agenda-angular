import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";
import { ContatosService } from "../services/contatos.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-editar-contato",
  templateUrl: "./editar-contato.component.html",
  styleUrls: ["./editar-contato.component.css"],
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contatoService: ContatosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
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

    const id = this.route.snapshot.paramMap.get("id");

    if (!id) return;
    this.contatoService.editar(id, this.contatoVM).subscribe({
      next: (res: FormsContatoViewModel) => this.processarSucesso(res),
      error: (err: HttpErrorResponse) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsContatoViewModel) {
    this.toastService.success(
      `O contato "${res.nome} foi editado com sucesso!"`,
      "Sucesso"
    );
    this.router.navigate(["/contatos/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar editar o contato: ${err.message}`,
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

    this.contatoVM = this.route.snapshot.data["contato"];
    this.form.patchValue(this.contatoVM);
  }

  campoEstaInvalido(tipo: string) {
    return this.form.get(tipo)!.touched && this.form.get(tipo)!.invalid;
  }

  get email() {
    return this.form.get("email");
  }
}
