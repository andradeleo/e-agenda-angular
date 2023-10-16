import { NgModule, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  Routes,
} from "@angular/router";
import { InserirCategoriasComponent } from "./inserir-categorias/inserir-categorias.component";
import { EditarCategoriasComponent } from "./editar-categorias/editar-categorias.component";
import { CategoriasService } from "./services/categorias.service";
import { FormsCategoriaViewModel } from "./models/forms-categoria.view-model";
import { ExcluirCategoriasComponent } from "./excluir-categorias/excluir-categorias.component";
import { ListarCategoriasComponent } from "./listar-categorias/listar-categorias.component";
import { ListarCategoriaViewModel } from "./models/listar-categoria.view-model";

const formsCategoriaResolver: ResolveFn<FormsCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CategoriasService).selecionarPorId(route.paramMap.get("id")!);
};

const listarContatoResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject(CategoriasService).selecionarTodos();
};

const routes: Routes = [
  {
    path: "",
    redirectTo: "listar",
    pathMatch: "full",
  },
  {
    path: "listar",
    component: ListarCategoriasComponent,
    resolve: { categorias: listarContatoResolver },
  },
  {
    path: "inserir",
    component: InserirCategoriasComponent,
  },
  {
    path: "editar/:id",
    component: EditarCategoriasComponent,
    resolve: { categoria: formsCategoriaResolver },
  },
  {
    path: "excluir/:id",
    component: ExcluirCategoriasComponent,
    resolve: { categoria: formsCategoriaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
