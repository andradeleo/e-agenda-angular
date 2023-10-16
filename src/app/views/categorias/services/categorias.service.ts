import { Injectable } from "@angular/core";
import { FormsCategoriaViewModel } from "../models/forms-categoria.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ListarCategoriaViewModel } from "../models/listar-categoria.view-model";

@Injectable({
  providedIn: "root",
})
export class CategoriasService {
  private endpoint: string = `${environment.URL}/api/categorias`;
  constructor(private readonly http: HttpClient) {}

  public inserir(
    categoria: FormsCategoriaViewModel
  ): Observable<FormsCategoriaViewModel> {
    return this.http
      .post<any>(this.endpoint, categoria, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarPorId(id: string): Observable<FormsCategoriaViewModel> {
    return this.http
      .get<any>(`${this.endpoint}/${id}`, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(id: string, categoria: FormsCategoriaViewModel) {
    return this.http
      .put<any>(
        `${this.endpoint}/${id}`,
        categoria,
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

  private obterHeadersAutorizacao() {
    const token = environment.apiKey;

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
