import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Musica } from '../../../core/models';

/**
 * Component: MusicaCardComponent
 * Card para exibir informações de uma música
 */

@Component({
  selector: 'app-musica-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './musica-card.component.html',
  styleUrls: ['./musica-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicaCardComponent {
  @Input() musica!: Musica;

  /**
   * Retorna URL da imagem ou placeholder
   */
  get imagemUrl(): string {
    return this.musica.imagemUrl || 'https://via.placeholder.com/300x300/1DB954/FFFFFF?text=Sem+Capa';
  }

  /**
   * Formata duração em minutos e segundos
   */
  get duracaoFormatada(): string {
    if (!this.musica.duracao) return '';

    const minutos = Math.floor(this.musica.duracao / 60);
    const segundos = this.musica.duracao % 60;

    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  }

  /**
   * Manipula clique no card
   */
  onClick(): void {
    console.log('Música selecionada:', this.musica);
    // TODO: Implementar reprodução ou navegação para detalhes
  }
}
