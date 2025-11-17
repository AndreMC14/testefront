import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

/**
 * Component: AppComponent
 * Componente raiz da aplicação
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Music Streaming';
  showNavbar = true;

  // Rotas onde a navbar não deve aparecer
  private noNavbarRoutes = ['/login', '/cadastro'];

  constructor(private router: Router) {
    // Observar mudanças de rota para controlar exibição da navbar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showNavbar = !this.noNavbarRoutes.includes(event.url);
      });

    // Verificar rota inicial
    this.showNavbar = !this.noNavbarRoutes.includes(this.router.url);
  }
}
