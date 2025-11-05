import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // ✅ Guardar en localStorage
  setItem(key: string, value: any): void {
    if (this.isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // ✅ Obtener desde localStorage
  getItem<T = any>(key: string): T | null {
    if (this.isBrowser) {
      const item = localStorage.getItem(key);
      try {
        return item ? (JSON.parse(item) as T) : null;
      } catch {
        return item as unknown as T;
      }
    }
    return null;
  }

  // ✅ Eliminar clave
  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  // ✅ Limpiar todo
  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
