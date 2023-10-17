import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  form!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  campoEstaInvalido(tipo: string) {
    return this.form.get(tipo)!.touched && this.form.get(tipo)!.invalid;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  gravar() {
    console.log(this.form.value);
  }
}
