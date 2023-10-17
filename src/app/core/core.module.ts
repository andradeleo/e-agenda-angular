import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { MensagemSemRegistroComponent } from "./mensagem-sem-registro/mensagem-sem-registro.component";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [NavbarComponent, MensagemSemRegistroComponent],
  imports: [CommonModule, RouterModule, NgbCollapseModule, AuthModule],
  exports: [NavbarComponent, MensagemSemRegistroComponent, AuthModule],
})
export class CoreModule {}
