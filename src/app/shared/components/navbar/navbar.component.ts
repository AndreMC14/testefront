import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../core/services';
import { Usuario } from '../../../core/models';

/**
 * Component: NavbarComponent
 * Barra de navegação principal com links e avatar do usuário
 */

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: Usuario | null = null;
  currentRoute = '';
  isMenuOpen = false;

  navLinks = [
    { path: '/search', label: 'Buscar', icon: 'search' },
    { path: '/biblioteca', label: 'Biblioteca', icon: 'library' },
    { path: '/planos', label: 'Planos', icon: 'premium' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Observar usuário atual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Observar mudanças de rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        this.isMenuOpen = false; // Fechar menu ao navegar
      });

    // Definir rota inicial
    this.currentRoute = this.router.url;
  }

  /**
   * Verifica se a rota está ativa
   */
  isActiveRoute(path: string): boolean {
    return this.currentRoute === path;
  }

  /**
   * Alterna menu mobile
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Realiza logout
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Obtém iniciais do nome do usuário
   */
  getUserInitials(): string {
    if (!this.currentUser?.nome) {
      return 'U';
    }
    const names = this.currentUser.nome.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  /**
   * Navega para perfil do usuário
   */
  goToProfile(): void {
    console.log('Navegar para perfil');
    // TODO: Implementar rota de perfil
  }
}
