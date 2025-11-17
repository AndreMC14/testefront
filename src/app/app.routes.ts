import { Routes } from '@angular/router';

/**
 * Configuração de rotas com lazy loading
 * Otimiza o carregamento inicial da aplicação
 */

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/cadastro',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Login - Music Streaming'
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./features/auth/cadastro/cadastro.component').then(m => m.CadastroComponent),
    title: 'Cadastro - Music Streaming'
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search.component').then(m => m.SearchComponent),
    title: 'Buscar - Music Streaming'
  },
  {
    path: 'biblioteca',
    loadComponent: () =>
      import('./features/biblioteca/biblioteca.component').then(m => m.BibliotecaComponent),
    title: 'Minha Biblioteca - Music Streaming'
  },
  {
    path: 'planos',
    loadComponent: () =>
      import('./features/planos/planos.component').then(m => m.PlanosComponent),
    title: 'Planos - Music Streaming'
  },
  {
    path: '**',
    redirectTo: '/search'
  }
];
