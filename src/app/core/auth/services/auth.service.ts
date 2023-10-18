import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from "rxjs";
import { environment } from "src/environments/environment";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-model";
import { TokenViewModel } from "../models/token.view-model";
import { LocalStorageService } from "./local-storage.service";
import { AutenticarUsuarioViewModel } from "../models/autenticar-usuario.view-model";
import { UsuarioTokenViewModel } from "../models/usuario-token.view-model";

@Injectable()
export class AuthService {
  private endpointRegistrar: string = `${environment.URL}/api/conta/registrar`;
  private endpointAutenticar: string = `${environment.URL}/api/conta/autenticar`;
  private endpointLogout: string = `${environment.URL}/api/conta/sair`;

  private usuarioAutenticado: BehaviorSubject<
    UsuarioTokenViewModel | undefined
  >;

  constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {
    this.usuarioAutenticado = new BehaviorSubject<
      UsuarioTokenViewModel | undefined
    >(undefined);
  }

  public obterUsuarioAutenticado() {
    return this.usuarioAutenticado.asObservable();
  }

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
      tap((dados: TokenViewModel) => this.notificarLogin(dados.usuarioToken)),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  logout(): Observable<any> {
    return this.http
      .post<any>(this.endpointLogout, {}, this.obterHeadersAutorizacao())
      .pipe(
        tap(() => {
          this.notificarLogout();
        }),
        tap(() => this.localStorageService.limparDadosLocar())
      );
  }

  public logarUsuarioSalvo(): void {
    const dados = this.localStorageService.obterDadosLocaisSalvos();
    if (!dados) return;

    const tokenEstaValido: boolean = new Date(dados.dataExpiracao) > new Date();

    if (tokenEstaValido) {
      this.notificarLogin(dados.usuarioToken);
    }
  }

  private notificarLogin(usuario: UsuarioTokenViewModel): void {
    this.usuarioAutenticado.next(usuario);
  }

  private notificarLogout(): void {
    this.usuarioAutenticado.next(undefined);
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

  private obterHeadersAutorizacao() {
    const token = this.localStorageService.obterDadosLocaisSalvos()?.chave;

    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
