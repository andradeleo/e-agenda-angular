import { NgModule, inject } from "@angular/core";
import {
  CanActivateFn,
  Router,
  RouterModule,
  Routes,
  UrlTree,
} from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { authGuard } from "./core/auth/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: "contatos",
    loadChildren: () =>
      import("./views/contatos/contatos.module").then(
        (module) => module.ContatosModule
      ),
    canActivate: [authGuard],
  },
  {
    path: "compromissos",
    loadChildren: () =>
      import("./views/compromissos/compromissos.module").then(
        (module) => module.CompromissosModule
      ),
    canActivate: [authGuard],
  },
  {
    path: "categorias",
    loadChildren: () =>
      import("./views/categorias/categorias.module").then(
        (module) => module.CategoriasModule
      ),
    canActivate: [authGuard],
  },
  {
    path: "despesas",
    loadChildren: () =>
      import("./views/despesas/despesas.module").then(
        (module) => module.DespesasModule
      ),
    canActivate: [authGuard],
  },
  {
    path: "tarefas",
    loadChildren: () =>
      import("./views/tarefas/tarefas.module").then(
        (module) => module.TarefasModule
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
