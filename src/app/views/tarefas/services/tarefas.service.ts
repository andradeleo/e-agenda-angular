import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormsTarefaViewModel } from "../models/form-tarefas.view-model";
import { ListarTarefaViewModel } from "../models/listar-tarefa.view-model";
import { VisualizarTarefaViewModel } from "../models/visualizar-tarefa.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class TarefasService {
  private endpoint: string = `${environment.URL}/api/tarefas`;

  constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {}

  public inserir(
    tarefa: FormsTarefaViewModel
  ): Observable<FormsTarefaViewModel> {
    return this.http
      .post<any>(this.endpoint, tarefa, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(id: string, tarefa: FormsTarefaViewModel) {
    return this.http
      .put<any>(
        `${this.endpoint}/${id}`,
        tarefa,
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

  public selecionarPorId(id: string): Observable<FormsTarefaViewModel> {
    return this.http
      .get<any>(`${this.endpoint}/${id}`, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarContatoCompletoPorId(
    id: string
  ): Observable<VisualizarTarefaViewModel> {
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
