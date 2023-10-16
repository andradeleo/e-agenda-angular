import { NgModule, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  Routes,
} from "@angular/router";
import { ListarTarefasComponent } from "./listar-tarefas/listar-tarefas.component";
import { InserirTarefasComponent } from "./inserir-tarefas/inserir-tarefas.component";
import { EditarTarefasComponent } from "./editar-tarefas/editar-tarefas.component";
import { ExcluirTarefasComponent } from "./excluir-tarefas/excluir-tarefas.component";
import { TarefasService } from "./services/tarefas.service";
import { ListarTarefaViewModel } from "./models/listar-tarefa.view-model";
import { FormsTarefaViewModel } from "./models/form-tarefas.view-model";
import { VisualizarTarefaViewModel } from "./models/visualizar-tarefa.view-model";

const formsTarefaResolver: ResolveFn<FormsTarefaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(TarefasService).selecionarPorId(route.paramMap.get("id")!);
};

const listarTarefasResolver: ResolveFn<ListarTarefaViewModel[]> = () => {
  return inject(TarefasService).selecionarTodos();
};

const visualizarTarefaReolver: ResolveFn<VisualizarTarefaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(TarefasService).selecionarContatoCompletoPorId(
    route.paramMap.get("id")!
  );
};

const routes: Routes = [
  {
    path: "",
    redirectTo: "listar",
    pathMatch: "full",
  },
  {
    path: "listar",
    component: ListarTarefasComponent,
    resolve: { tarefas: listarTarefasResolver },
  },
  {
    path: "inserir",
    component: InserirTarefasComponent,
  },
  {
    path: "editar/:id",
    component: EditarTarefasComponent,
    resolve: { tarefa: formsTarefaResolver },
  },
  {
    path: "excluir/:id",
    component: ExcluirTarefasComponent,
    resolve: { tarefa: visualizarTarefaReolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefasRoutingModule {}
