import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-model";
import { TokenViewModel } from "../models/token.view-model";
import { LocalStorageService } from "./local-storage.service";
import { AutenticarUsuarioViewModel } from "../models/autenticar-usuario.view-model";

@Injectable()
export class AuthService {
  private endpointRegistrar: string = `${environment.URL}/api/conta/registrar`;
  private endpointAutenticar: string = `${environment.URL}/api/conta/autenticar`;

  constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {}

  registrar(usuario: RegistrarUsuarioViewModel): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointRegistrar, usuario).pipe(
      map((res) => res.dados),
      tap((dados: TokenViewModel) =>
        this.localStorageService.salvarDadosLocaisUsuario(dados)
      ),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  login(usuario: AutenticarUsuarioViewModel): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointAutenticar, usuario).pipe(
      map((res) => res.dados),
      tap((dados: TokenViewModel) =>
        this.localStorageService.salvarDadosLocaisUsuario(dados)
      ),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  private processarErroHttp(err: HttpErrorResponse) {
    let mensagemErro = "";

    if (err.status == 0) {
      mensagemErro = "Ocorreu um erro ao processar a requisição";
    }

    if (err.status == 401) {
      mensagemErro =
        "Usuário não está autorizado. Efetue o login e tente novamente!";
    } else {
      mensagemErro = err.error?.erros[0];
    }

    return throwError(() => new Error(mensagemErro));
  }
}
