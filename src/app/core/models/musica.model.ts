/**
 * Model: Musica
 * Representa uma música no sistema
 * Preparado para integração com backend ASP.NET Core
 */

export interface Musica {
  id?: number;
  titulo: string;
  artista: string;
  album?: string;
  genero: string;
  duracao?: number; // em segundos
  imagemUrl?: string;
  audioUrl?: string;
  anoLancamento?: number;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}

/**
 * DTO para criação de música
 */
export interface CriarMusicaDto {
  titulo: string;
  artista: string;
  album?: string;
  genero: string;
  duracao?: number;
  imagemUrl?: string;
  audioUrl?: string;
  anoLancamento?: number;
}

/**
 * DTO para atualização de música
 */
export interface AtualizarMusicaDto {
  titulo?: string;
  artista?: string;
  album?: string;
  genero?: string;
  duracao?: number;
  imagemUrl?: string;
  audioUrl?: string;
  anoLancamento?: number;
}
