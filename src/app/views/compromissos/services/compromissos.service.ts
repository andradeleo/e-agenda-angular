import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, throwError } from "rxjs";
import { FormsCompromissoViewModel } from "../models/forms-compromisso.view-model copy";
import { ListarCompromissoViewModel } from "../models/listar-compromisso.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()
export class CompromissosService {
  private endpoint: string = `${environment.URL}/api/compromissos`;

  constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {}

  public inserir(
    compromisso: FormsCompromissoViewModel
  ): Observable<FormsCompromissoViewModel> {
    return this.http
      .post<any>(this.endpoint, compromisso, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(id: string, compromisso: FormsCompromissoViewModel) {
    return this.http
      .put<any>(
        `${this.endpoint}/${id}`,
        compromisso,
        this.obterHeadersAutorizacao()
      )
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(
      `${this.endpoint}/${id}`,
      this.obterHeadersAutorizacao()
    );
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarPorId(id: string): Observable<FormsCompromissoViewModel> {
    return this.http
      .get<any>(`${this.endpoint}/${id}`, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
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
