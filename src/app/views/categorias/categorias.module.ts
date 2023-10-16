import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InserirCategoriasComponent } from "./inserir-categorias/inserir-categorias.component";
import { CategoriasRoutingModule } from "./categorias-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoriasService } from "./services/categorias.service";
import { EditarCategoriasComponent } from "./editar-categorias/editar-categorias.component";
import { ExcluirCategoriasComponent } from "./excluir-categorias/excluir-categorias.component";
import { ListarCategoriasComponent } from "./listar-categorias/listar-categorias.component";
import { CardCategoriaComponent } from "./card-categorias/card-categoria.component";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [
    InserirCategoriasComponent,
    EditarCategoriasComponent,
    ExcluirCategoriasComponent,
    ListarCategoriasComponent,
    CardCategoriaComponent,
  ],

  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [CategoriasService],
})
export class CategoriasModule {}
