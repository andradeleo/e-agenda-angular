import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ListarContatoViewModel } from "../../contatos/models/listar-contato.view-model";
import { CompromissosService } from "../services/compromissos.service";
import { ContatosService } from "../../contatos/services/contatos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsCompromissoViewModel } from "../models/forms-compromisso.view-model copy";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-editar-compromissos",
  templateUrl: "./editar-compromissos.component.html",
  styleUrls: ["./editar-compromissos.component.css"],
})
export class EditarCompromissosComponent {
  form!: FormGroup;
  contatos: ListarContatoViewModel[] = [];
  compromissoVM!: FormsCompromissoViewModel;
  idSelecionado: string | null = "";

  constructor(
    private readonly compromissosService: CompromissosService,
    private readonly contatosService: ContatosService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl("", Validators.required),
      tipoLocal: new FormControl("", Validators.required),
      link: new FormControl("", Validators.required),
      local: new FormControl("", Validators.required),
      data: new FormControl(new Date(), Validators.required),
      horaInicio: new FormControl("08:00", Validators.required),
      horaTermino: new FormControl("09:00", Validators.required),
      contatoId: new FormControl(""),
    });

    this.idSelecionado = this.route.snapshot.paramMap.get("id");
    if (!this.idSelecionado) return;

    this.contatosService.selecionarTodos().subscribe((res) => {
      this.contatos = res;
    });

    this.compromissosService
      .selecionarPorId(this.idSelecionado)
      .subscribe((res) => {
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
        this.form.patchValue(novaRes);
      });
  }

  gravar() {
    if (this.form.invalid) {
      return;
    }

    if (!this.idSelecionado) return;

    this.compromissoVM = this.form.value;
    this.compromissosService
      .editar(this.idSelecionado, this.compromissoVM)
      .subscribe({
        next: (res: FormsCompromissoViewModel) => this.processarSucesso(res),
        error: (err: HttpErrorResponse) => this.processarFalha(err),
      });
  }

  processarSucesso(res: FormsCompromissoViewModel) {
    this.toastService.success(
      `O compromisso "${res.assunto} foi editado com sucesso!"`,
      "Sucesso"
    );
    this.router.navigate(["/compromissos/listar"]);
  }

  processarFalha(err: HttpErrorResponse) {
    this.toastService.error(
      `Houve uma falha ao tentar editar o compromisso: ${err.message}`,
      "Error"
    );
    this.router.navigate(["/compromissos/listar"]);
  }

  campoEstaInvalido(tipo: string) {
    return this.form.get(tipo)!.touched && this.form.get(tipo)!.invalid;
  }
}
