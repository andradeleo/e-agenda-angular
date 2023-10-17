import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";
import { ListarContatoViewModel } from "../models/listar-contato.view-model";
import { VisualizarContatoViewModel } from "../models/visualizar-contato.view-model";
import { VisualizarContatoCompletoViewModel } from "../models/visualizar-contato-completo.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()
export class ContatosService {
  private endpoint: string = `${environment.URL}/api/contatos`;

  constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {}

  public inserir(
    contato: FormsContatoViewModel
  ): Observable<FormsContatoViewModel> {
    return this.http
      .post<any>(this.endpoint, contato, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(id: string, contato: FormsContatoViewModel) {
    return this.http
      .put<any>(
        `${this.endpoint}/${id}`,
        contato,
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

  public selecionarTodos(
    status: number = 0
  ): Observable<ListarContatoViewModel[]> {
    return this.http
      .get<any>(
        this.endpoint + `?statusFavorito=${status}`,
        this.obterHeadersAutorizacao()
      )
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel> {
    return this.http
      .get<any>(`${this.endpoint}/${id}`, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarContatoCompletoPorId(
    id: string
  ): Observable<VisualizarContatoCompletoViewModel> {
    return this.http
      .get<any>(
        `${this.endpoint}/visualizacao-completa/${id}`,
        this.obterHeadersAutorizacao()
      )
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public favoritarContato(id: string): Observable<FormsContatoViewModel> {
    return this.http
      .put<any>(
        `${this.endpoint}/favoritos/${id}`,
        {},
        this.obterHeadersAutorizacao()
      )
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
