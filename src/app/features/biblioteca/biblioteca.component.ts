import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Musica } from '../../core/models';
import { MusicaService } from '../../core/services';
import { MusicaCardComponent } from './musica-card/musica-card.component';

/**
 * Component: BibliotecaComponent
 * Exibe a biblioteca de músicas do usuário
 */

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, MusicaCardComponent],
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BibliotecaComponent implements OnInit {
  musicas$!: Observable<Musica[]>;

  constructor(private musicaService: MusicaService) {}

  ngOnInit(): void {
    this.musicas$ = this.musicaService.getMusicas();
  }

  /**
   * TrackBy function para otimizar renderização
   */
  trackByMusicaId(index: number, musica: Musica): number {
    return musica.id || index;
  }

  /**
   * Abre modal para adicionar artista
   * TODO: Implementar modal
   */
  adicionarArtista(): void {
    console.log('Adicionar artista');
  }

  /**
   * Abre modal para adicionar música
   * TODO: Implementar modal
   */
  adicionarMusica(): void {
    console.log('Adicionar música');
  }
}
