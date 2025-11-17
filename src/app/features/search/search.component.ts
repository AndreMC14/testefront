import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Musica, Categoria, CATEGORIAS_PADRAO } from '../../core/models';
import { MusicaService } from '../../core/services';
import { MusicaCardComponent } from '../biblioteca/musica-card/musica-card.component';

/**
 * Component: SearchComponent
 * Componente de busca com categorias e resultados
 */

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MusicaCardComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  resultados$!: Observable<Musica[]>;
  categorias: Categoria[] = CATEGORIAS_PADRAO.slice(0, 6); // Primeiras 6 categorias

  constructor(private musicaService: MusicaService) {}

  ngOnInit(): void {
    this.setupSearch();
  }

  /**
   * Configura busca com debounce
   */
  private setupSearch(): void {
    this.resultados$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(termo => {
        if (!termo || termo.trim().length === 0) {
          return of([]);
        }
        return this.musicaService.buscarMusicas(termo);
      })
    );
  }

  /**
   * TrackBy function para categorias
   */
  trackByCategoriaId(index: number, categoria: Categoria): number {
    return categoria.id || index;
  }

  /**
   * TrackBy function para músicas
   */
  trackByMusicaId(index: number, musica: Musica): number {
    return musica.id || index;
  }

  /**
   * Seleciona uma categoria
   */
  selecionarCategoria(categoria: Categoria): void {
    console.log('Categoria selecionada:', categoria);
    // TODO: Filtrar músicas por categoria
  }
}
