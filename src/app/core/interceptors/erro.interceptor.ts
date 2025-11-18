import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Redirecionar para login
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      
      return throwError(() => error);
    })
  );
};