import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';

/**
 * Configuração da aplicação Angular
 * - Zone change detection otimizado
 * - Router com lazy loading e transições
 * - HttpClient preparado para integração com backend
 */

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(), // Permite binding de route params como inputs
      withViewTransitions() // Habilita transições suaves entre rotas
    ),
    provideHttpClient(
      withInterceptorsFromDi() // Permite uso de interceptors (para adicionar tokens, etc)
    )
  ]
};
