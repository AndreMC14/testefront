/**
 * Model: Usuario
 * Representa um usuário do sistema
 * Preparado para integração com backend ASP.NET Core
 */

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  imagemPerfilUrl?: string;
  planoId?: number;
  plano?: Plano;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}

/**
 * DTO para cadastro de usuário
 */
export interface CadastroUsuarioDto {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

/**
 * DTO para login
 */
export interface LoginDto {
  email: string;
  senha: string;
}

/**
 * Resposta de autenticação
 */
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  usuario: Usuario;
  expiresIn: number;
}

/**
 * Model: Plano
 * Representa um plano de assinatura
 */
export interface Plano {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  beneficios: string[];
  ativo: boolean;
}
