import { APP_INITIALIZER, NgModule, inject } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { DashboardModule } from "./views/dashboard/dashboard.module";
import { CoreModule } from "./core/core.module";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { RegistroModule } from "./views/registro/registro.module";
import { LoginModule } from "./views/login/login.module";
import { AuthService } from "./core/auth/services/auth.service";
import { httpTokenInterceptor } from "./core/auth/interceptors/http-token.interceptor";

function logarUsuarioSalvoFactory(authService: AuthService) {
  return () => authService.logarUsuarioSalvo();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    RegistroModule,
    LoginModule,
    DashboardModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-center",
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [AuthService],
      multi: true,
    },
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
