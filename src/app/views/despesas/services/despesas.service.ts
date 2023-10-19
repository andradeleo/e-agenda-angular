import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { FormDespesaViewModel } from "../models/forms-despesa.view-model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ListarDespesaViewModel } from "../models/listar-despesa.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class DespesasService {
  private endpoint: string = `${environment.URL}/api/despesas`;

  constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService
  ) {}

  public inserir(
    despesas: FormDespesaViewModel
  ): Observable<FormDespesaViewModel> {
    return this.http.post<any>(this.endpoint, despesas).pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public editar(id: string, despesa: FormDespesaViewModel) {
    return this.http.put<any>(`${this.endpoint}/${id}`, despesa).pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  public selecionarPorId(id: string): Observable<FormDespesaViewModel> {
    return this.http.get<any>(`${this.endpoint}/${id}`).pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    return this.http.get<any>(this.endpoint).pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public selecionarDespesasAntigas(): Observable<ListarDespesaViewModel[]> {
    return this.http.get<any>(this.endpoint + "/antigas").pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public selecionarDespesasUltimoMes(): Observable<ListarDespesaViewModel[]> {
    return this.http.get<any>(this.endpoint + "/ultimos-30-dias").pipe(
      map((res) => res.dados),
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
