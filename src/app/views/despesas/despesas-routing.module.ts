import { NgModule, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  Routes,
} from "@angular/router";
import { InserirDespesasComponent } from "./inserir-despesas/inserir-despesas.component";
import { EditarDespesasComponent } from "./editar-despesas/editar-despesas.component";
import { FormDespesaViewModel } from "./models/forms-despesa.view-model";
import { DespesasService } from "./services/despesas.service";
import { ExcluirDespesasComponent } from "./excluir-despesas/excluir-despesas.component";
import { ListarDespesasComponent } from "./listar-despesas/listar-despesas.component";
import { ListarDespesaViewModel } from "./models/listar-despesa.view-model";

const formsDespesaResolver: ResolveFn<FormDespesaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(DespesasService).selecionarPorId(route.paramMap.get("id")!);
};

const listarDespesasResolver: ResolveFn<ListarDespesaViewModel[]> = () => {
  return inject(DespesasService).selecionarTodos();
};

const routes: Routes = [
  {
    path: "",
    redirectTo: "listar",
    pathMatch: "full",
  },
  {
    path: "listar",
    component: ListarDespesasComponent,
    resolve: { despesas: listarDespesasResolver },
  },
  {
    path: "inserir",
    component: InserirDespesasComponent,
  },
  {
    path: "editar/:id",
    component: EditarDespesasComponent,
    resolve: { despesa: formsDespesaResolver },
  },
  {
    path: "excluir/:id",
    component: ExcluirDespesasComponent,
    resolve: { despesa: formsDespesaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasRoutingModule {}
