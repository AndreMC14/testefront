/**
 * Model: Categoria
 * Representa uma categoria/gênero musical
 * Preparado para integração com backend ASP.NET Core
 */

export interface Categoria {
  id?: number;
  nome: string;
  descricao?: string;
  imagemUrl?: string;
  cor?: string; // Cor de destaque para o card
  slug?: string;
}

/**
 * Categorias predefinidas para o frontend
 */
export const CATEGORIAS_PADRAO: Categoria[] = [
  {
    id: 1,
    nome: 'Podcasts',
    cor: '#e13300',
    slug: 'podcasts'
  },
  {
    id: 2,
    nome: 'Lançamentos',
    cor: '#1e3264',
    slug: 'lancamentos'
  },
  {
    id: 3,
    nome: 'Paradas',
    cor: '#27856a',
    slug: 'paradas'
  },
  {
    id: 4,
    nome: 'Shows',
    cor: '#8d67ab',
    slug: 'shows'
  },
  {
    id: 5,
    nome: 'Feito para você',
    cor: '#503750',
    slug: 'feito-para-voce'
  },
  {
    id: 6,
    nome: 'Descobrir',
    cor: '#477d95',
    slug: 'descobrir'
  },
  {
    id: 7,
    nome: 'Rock',
    cor: '#227722',
    slug: 'rock'
  },
  {
    id: 8,
    nome: 'Pop',
    cor: '#227722',
    slug: 'pop'
  },
  {
    id: 9,
    nome: 'Hip Hop',
    cor: '#227722',
    slug: 'hip-hop'
  },
  {
    id: 10,
    nome: 'Clássico',
    cor: '#227722',
    slug: 'classico'
  }
];
