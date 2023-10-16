import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarCompromissosComponent } from "./listar-compromissos/listar-compromissos.component";
import { InserirCompromissosComponent } from "./inserir-compromissos/inserir-compromissos.component";
import { EditarCompromissosComponent } from "./editar-compromissos/editar-compromissos.component";
import { ExcluirCompromissosComponent } from "./excluir-compromissos/excluir-compromissos.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "listar",
    pathMatch: "full",
  },
  {
    path: "listar",
    component: ListarCompromissosComponent,
  },
  {
    path: "inserir",
    component: InserirCompromissosComponent,
  },
  {
    path: "editar/:id",
    component: EditarCompromissosComponent,
  },
  {
    path: "excluir/:id",
    component: ExcluirCompromissosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompromissosRoutingModule {}
