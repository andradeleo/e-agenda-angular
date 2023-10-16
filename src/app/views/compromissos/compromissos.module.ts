import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { InserirCompromissosComponent } from "./inserir-compromissos/inserir-compromissos.component";
import { CompromissosService } from "./services/compromissos.service";
import { ContatosService } from "../contatos/services/contatos.service";
import { EditarCompromissosComponent } from "./editar-compromissos/editar-compromissos.component";
import { ExcluirCompromissosComponent } from "./excluir-compromissos/excluir-compromissos.component";
import { ListarCompromissosComponent } from "./listar-compromissos/listar-compromissos.component";
import { CardCompromissoComponent } from "./card-compromisso/card-compromisso.component";
import { CompromissosRoutingModule } from "./compromissos-routing.module";
import { ContatosModule } from "../contatos/contatos.module";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [
    InserirCompromissosComponent,
    EditarCompromissosComponent,
    ExcluirCompromissosComponent,
    ListarCompromissosComponent,
    CardCompromissoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompromissosRoutingModule,
    ContatosModule,
    CoreModule,
  ],
  providers: [CompromissosService],
})
export class CompromissosModule {}
