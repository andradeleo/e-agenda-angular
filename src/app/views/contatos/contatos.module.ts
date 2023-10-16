import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InserirContatoComponent } from "./inserir-contato/inserir-contato.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ContatosService } from "./services/contatos.service";
import { ListarContatosComponent } from "./listar-contatos/listar-contatos.component";
import { EditarContatoComponent } from "./editar-contato/editar-contato.component";
import { ExcluirContatoComponent } from "./excluir-contato/excluir-contato.component";
import { CardContatoComponent } from "./card-contato/card-contato.component";
import { FiltroContatosFavoritosComponent } from "./filtro-contatos-favoritos/filtro-contatos-favoritos.component";
import "src/app/extensions/form-group.extension";
import { ContatosRoutingModule } from "./contatos-routing.module";
import { VisualizarContatoComponent } from "./visualizar-contato/visualizar-contato.component";
import { CardVisualizaoCompletaComponent } from "./card-visualizao-completa/card-visualizao-completa.component";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [
    InserirContatoComponent,
    ListarContatosComponent,
    EditarContatoComponent,
    ExcluirContatoComponent,
    CardContatoComponent,
    FiltroContatosFavoritosComponent,
    VisualizarContatoComponent,
    CardVisualizaoCompletaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContatosRoutingModule,
    CoreModule,
  ],
  providers: [ContatosService],
})
export class ContatosModule {}
