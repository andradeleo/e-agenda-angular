import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InserirDespesasComponent } from "./inserir-despesas/inserir-despesas.component";
import { DespesasRoutingModule } from "./despesas-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { DespesasService } from "./services/despesas.service";
import { EditarDespesasComponent } from "./editar-despesas/editar-despesas.component";
import { ExcluirDespesasComponent } from "./excluir-despesas/excluir-despesas.component";
import { ListarDespesasComponent } from "./listar-despesas/listar-despesas.component";
import { CardDespesasComponent } from "./card-despesas/card-despesas.component";
import { CoreModule } from "src/app/core/core.module";
import { FiltroDataComponent } from './filtro-data/filtro-data.component';

@NgModule({
  declarations: [
    InserirDespesasComponent,
    EditarDespesasComponent,
    ExcluirDespesasComponent,
    ListarDespesasComponent,
    CardDespesasComponent,
    FiltroDataComponent,
  ],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,

    CoreModule,
  ],
  providers: [DespesasService],
})
export class DespesasModule {}
