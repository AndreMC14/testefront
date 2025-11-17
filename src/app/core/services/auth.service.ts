import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Usuario, LoginDto, CadastroUsuarioDto, AuthResponse } from '../models';

/**
 * Service: AuthService
 * Gerencia autenticação e autorização
 * Preparado para integração com API ASP.NET Core
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL base da API (será configurada no environment)
  private readonly apiUrl = '/api/auth';

  // Estado de autenticação
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Verifica se há usuário salvo no localStorage
    this.loadUserFromStorage();
  }

  /**
   * Realiza login
   * TODO: Integrar com POST /api/auth/login
   */
  login(dto: LoginDto): Observable<AuthResponse> {
    // Mock de resposta de login
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      usuario: {
        id: 1,
        nome: 'Usuário Demo',
        email: dto.email
      },
      expiresIn: 3600
    };

    return of(mockResponse).pipe(
      delay(500), // Simula latência de rede
      tap(response => {
        this.setCurrentUser(response.usuario);
        this.saveTokenToStorage(response.token);
      })
    );
  }

  /**
   * Realiza cadastro
   * TODO: Integrar com POST /api/auth/cadastro
   */
  cadastrar(dto: CadastroUsuarioDto): Observable<AuthResponse> {
    // Mock de resposta de cadastro
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      usuario: {
        id: Date.now(),
        nome: dto.nome,
        email: dto.email
      },
      expiresIn: 3600
    };

    return of(mockResponse).pipe(
      delay(500),
      tap(response => {
        this.setCurrentUser(response.usuario);
        this.saveTokenToStorage(response.token);
      })
    );
  }

  /**
   * Realiza logout
   */
  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }

  /**
   * Obtém o usuário atual
   */
  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Obtém o token de autenticação
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Define o usuário atual
   */
  private setCurrentUser(usuario: Usuario): void {
    this.currentUserSubject.next(usuario);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('current_user', JSON.stringify(usuario));
  }

  /**
   * Salva o token no localStorage
   */
  private saveTokenToStorage(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Carrega o usuário do localStorage
   */
  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('current_user');
    const token = localStorage.getItem('auth_token');

    if (userJson && token) {
      try {
        const usuario = JSON.parse(userJson);
        this.currentUserSubject.next(usuario);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        console.error('Erro ao carregar usuário do storage:', error);
        this.logout();
      }
    }
  }
}
