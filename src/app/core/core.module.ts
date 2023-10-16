import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { MensagemSemRegistroComponent } from "./mensagem-sem-registro/mensagem-sem-registro.component";

@NgModule({
  declarations: [NavbarComponent, MensagemSemRegistroComponent],
  imports: [CommonModule, RouterModule, NgbCollapseModule],
  exports: [NavbarComponent, MensagemSemRegistroComponent],
})
export class CoreModule {}
