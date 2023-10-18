import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { UsuarioTokenViewModel } from "src/app/core/auth/models/usuario-token.view-model";
import { AuthService } from "src/app/core/auth/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  usuario$?: Observable<UsuarioTokenViewModel | undefined>;
  subscription?: Subscription;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.usuario$ = this.authService.obterUsuarioAutenticado();
  }
}
