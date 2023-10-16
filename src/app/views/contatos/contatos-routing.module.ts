import { NgModule, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  Routes,
} from "@angular/router";
import { InserirContatoComponent } from "./inserir-contato/inserir-contato.component";
import { ListarContatosComponent } from "./listar-contatos/listar-contatos.component";
import { EditarContatoComponent } from "./editar-contato/editar-contato.component";
import { ExcluirContatoComponent } from "./excluir-contato/excluir-contato.component";
import { ContatosService } from "./services/contatos.service";
import { FormsContatoViewModel } from "./models/forms-contato.view-model";
import { ListarContatoViewModel } from "./models/listar-contato.view-model";
import { VisualizarContatoComponent } from "./visualizar-contato/visualizar-contato.component";
import { VisualizarContatoCompletoViewModel } from "./models/visualizar-contato-completo.view-model";

const formsContatoResolver: ResolveFn<FormsContatoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ContatosService).selecionarPorId(route.paramMap.get("id")!);
};

const formsContatoCompletoResolver: ResolveFn<
  VisualizarContatoCompletoViewModel
> = (route: ActivatedRouteSnapshot) => {
  return inject(ContatosService).selecionarContatoCompletoPorId(
    route.paramMap.get("id")!
  );
};

const visualizarContatoReolver: ResolveFn<FormsContatoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ContatosService).selecionarPorId(route.paramMap.get("id")!);
};

const listarContatoResolver: ResolveFn<ListarContatoViewModel[]> = () => {
  return inject(ContatosService).selecionarTodos();
};

const routes: Routes = [
  {
    path: "",
    redirectTo: "listar",
    pathMatch: "full",
  },
  {
    path: "inserir",
    component: InserirContatoComponent,
  },
  {
    path: "listar",
    component: ListarContatosComponent,
    resolve: { contatos: listarContatoResolver },
  },
  {
    path: "editar/:id",
    component: EditarContatoComponent,
    resolve: { contato: formsContatoResolver },
  },
  {
    path: "visualizar-contato/:id",
    component: VisualizarContatoComponent,
    resolve: { contato: formsContatoCompletoResolver },
  },
  {
    path: "excluir/:id",
    component: ExcluirContatoComponent,
    resolve: { contato: visualizarContatoReolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatosRoutingModule {}
