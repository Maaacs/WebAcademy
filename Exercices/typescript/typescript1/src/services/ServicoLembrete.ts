import { Lembrete } from "../models/Lembrete";

class ServicoLembrete {
  private lembretes: Lembrete[] = [];

  public criarLembrete(titulo: string): [boolean, Lembrete | string] {
    if (!titulo) return [false, "O título não pode ser vazio"];
    
    const novoLembrete: Lembrete = {
      id: this.gerarId(),
      title: titulo,
      createdAt: new Date()
    };
    this.lembretes.push(novoLembrete);
    return [true, novoLembrete];
  }
  
  public editarLembrete(id: string, novoTitulo: string): [boolean, Lembrete | string] {
    const lembrete = this.lembretes.find(lembrete => lembrete.id === id);
    if (!lembrete) {
      return [false, "Lembrete não encontrado."];
    }
    if (!novoTitulo.trim()) {
      return [false, "O título do lembrete não pode estar vazio."];
    }
    lembrete.title = novoTitulo;
    lembrete.createdAt = new Date();
    return [true, lembrete];
  }

  public removerLembrete(id: string): [boolean, string] {
    const index = this.lembretes.findIndex(lembrete => lembrete.id === id);
    if (index === -1) {
      return [false, "Lembrete não encontrado."];
    }
    this.lembretes.splice(index, 1);
    return [true, "Lembrete removido com sucesso."];
  }

  private gerarId(): string {
    return Math.random().toString(36).substring(2, 9);
  }


  public buscarLembretePorId(id: string): Lembrete | undefined {
    return this.lembretes.find(lembrete => lembrete.id === id);
  }

}

export const servicoLembrete = new ServicoLembrete();
