import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Plano } from '../models';

/**
 * Service: PlanosService
 * Gerencia planos de assinatura
 * Preparado para integração com API ASP.NET Core
 */

@Injectable({
  providedIn: 'root'
})
export class PlanosService {
  private readonly apiUrl = '/api/planos';

  constructor() {}

  /**
   * Obtém todos os planos disponíveis
   * TODO: Integrar com GET /api/planos
   */
  getPlanos(): Observable<Plano[]> {
    return of(this.getPlanosMock());
  }

  /**
   * Obtém um plano por ID
   * TODO: Integrar com GET /api/planos/{id}
   */
  getPlanoPorId(id: number): Observable<Plano | undefined> {
    const plano = this.getPlanosMock().find(p => p.id === id);
    return of(plano);
  }

  /**
   * Dados mock de planos
   */
  private getPlanosMock(): Plano[] {
    return [
      {
        id: 1,
        nome: 'Plano Individual',
        descricao: 'Mude a forma como você escuta. Áudio sem anúncios e em alta qualidade.',
        preco: 19.90,
        beneficios: [
          'Ouça sem anúncios',
          'Reprodução offline',
          'Qualidade de áudio aprimorada',
          'Pule faixas ilimitadamente'
        ],
        ativo: true
      },
      {
        id: 2,
        nome: 'Plano Família',
        descricao: 'Até 6 contas Premium para membros da família que moram juntos.',
        preco: 34.90,
        beneficios: [
          'Até 6 contas Premium',
          'Bloqueio de músicas explícitas',
          'Spotify Kids',
          'Ouça sem anúncios',
          'Reprodução offline',
          'Qualidade de áudio aprimorada'
        ],
        ativo: true
      },
      {
        id: 3,
        nome: 'Plano Estudante',
        descricao: 'Desconto especial para estudantes universitários.',
        preco: 9.90,
        beneficios: [
          'Desconto para estudantes verificados',
          'Ouça sem anúncios',
          'Reprodução offline',
          'Qualidade de áudio aprimorada'
        ],
        ativo: true
      }
    ];
  }
}
