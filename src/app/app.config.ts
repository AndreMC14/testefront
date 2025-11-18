import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';


/**
 * Configuração da aplicação Angular
 * - Zone change detection otimizado
 * - Router com lazy loading e transições
 * - HttpClient preparado para integração com backend
 */

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
