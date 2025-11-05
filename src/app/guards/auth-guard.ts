import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);

  // Verifica si está en entorno navegador
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) {
    // Si está en SSR, no forzamos redirección todavía
    return true;
  }

  try {
    const user = localStorage.getItem('user');
    return user ? true : router.parseUrl('/');
  } catch (error) {
    console.warn('Error al acceder a localStorage', error);
    return router.parseUrl('/');
  }
};
