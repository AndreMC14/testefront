import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Plano } from '../../core/models';
import { PlanosService } from '../../core/services';

/**
 * Component: PlanosComponent
 * Exibe planos de assinatura disponíveis
 */

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanosComponent implements OnInit {
  planos$!: Observable<Plano[]>;

  constructor(private planosService: PlanosService) {}

  ngOnInit(): void {
    this.planos$ = this.planosService.getPlanos();
  }

  /**
   * TrackBy function para otimizar renderização
   */
  trackByPlanoId(index: number, plano: Plano): number {
    return plano.id;
  }

  /**
   * Formata preço em reais
   */
  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  /**
   * Inicia processo de assinatura
   */
  assinar(plano: Plano): void {
    console.log('Assinar plano:', plano);
    // TODO: Implementar fluxo de pagamento
  }
}
