import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TarefasRoutingModule } from "./tarefas-routing.module";
import { InserirTarefasComponent } from "./inserir-tarefas/inserir-tarefas.component";
import { EditarTarefasComponent } from "./editar-tarefas/editar-tarefas.component";
import { ExcluirTarefasComponent } from "./excluir-tarefas/excluir-tarefas.component";
import { ListarTarefasComponent } from "./listar-tarefas/listar-tarefas.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CardTarefasComponent } from "./card-tarefas/card-tarefas.component";
import { TabelaItensComponent } from "./tabela-itens/tabela-itens.component";
import { MensagemSemRegistroComponent } from "src/app/core/mensagem-sem-registro/mensagem-sem-registro.component";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [
    InserirTarefasComponent,
    EditarTarefasComponent,
    ExcluirTarefasComponent,
    ListarTarefasComponent,
    CardTarefasComponent,
    TabelaItensComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TarefasRoutingModule,
    CoreModule,
  ],
})
export class TarefasModule {}
