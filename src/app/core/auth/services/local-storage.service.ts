import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/token.view-model";

@Injectable()
export class LocalStorageService {
  private chaveLocalStorage: string = "@e-agenda:UserToken-1.0.0";
  constructor() {}

  public salvarDadosLocaisUsuario(usuario: TokenViewModel) {
    const jsonString = JSON.stringify(usuario);
    localStorage.setItem(this.chaveLocalStorage, jsonString);
  }

  public obterDadosLocaisSalvos(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.chaveLocalStorage);
    if (!jsonString) return undefined;

    return JSON.parse(jsonString) as TokenViewModel;
  }

  public limparDadosLocar(): void {
    localStorage.removeItem(this.chaveLocalStorage);
  }
}
