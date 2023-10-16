import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "contatos",
    loadChildren: () =>
      import("./views/contatos/contatos.module").then(
        (module) => module.ContatosModule
      ),
  },
  {
    path: "compromissos",
    loadChildren: () =>
      import("./views/compromissos/compromissos.module").then(
        (module) => module.CompromissosModule
      ),
  },
  {
    path: "categorias",
    loadChildren: () =>
      import("./views/categorias/categorias.module").then(
        (module) => module.CategoriasModule
      ),
  },
  {
    path: "despesas",
    loadChildren: () =>
      import("./views/despesas/despesas.module").then(
        (module) => module.DespesasModule
      ),
  },
  {
    path: "tarefas",
    loadChildren: () =>
      import("./views/tarefas/tarefas.module").then(
        (module) => module.TarefasModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
