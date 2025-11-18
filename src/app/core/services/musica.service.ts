import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Musica, CriarMusicaDto, AtualizarMusicaDto } from '../models';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MusicaService {
  private readonly apiUrl = `${environment.apiUrl}/musicas`;

  constructor(private http: HttpClient) {}

 getMusicas(): Observable<Musica[]> {
  return this.http.get<Musica[]>(this.apiUrl).pipe(
    catchError(error => {
      console.error('Erro ao buscar músicas:', error);
      return throwError(() => new Error('Falha ao carregar músicas'));
    })
  );
}

  getMusicaPorId(id: number): Observable<Musica> {
    return this.http.get<Musica>(`${this.apiUrl}/${id}`);
  }

  adicionarMusica(dto: CriarMusicaDto): Observable<Musica> {
    return this.http.post<Musica>(this.apiUrl, dto);
  }

  atualizarMusica(id: number, dto: AtualizarMusicaDto): Observable<Musica> {
    return this.http.put<Musica>(`${this.apiUrl}/${id}`, dto);
  }

  removerMusica(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarMusicas(termo: string): Observable<Musica[]> {
    return this.http.get<Musica[]>(`${this.apiUrl}/buscar`, {
      params: { termo }
    });
  }
}


