import { Injectable, signal, OnDestroy } from '@angular/core';

/**
 * AlfResizeService
 * Servicio compartido que centraliza la detección de resize del viewport.
 * Usa un único listener `window.resize` para toda la librería,
 * evitando que cada componente cree su propio observer.
 *
 * Emite un signal reactivo `resizeSignal` que los componentes
 * pueden leer en `effect()` o `computed()` para reaccionar a cambios de tamaño.
 */
@Injectable({ providedIn: 'root' })
export class AlfResizeService implements OnDestroy {

  /** Signal que se incrementa en cada evento resize del viewport */
  public readonly resizeSignal = signal<number>(0);

  private readonly _onResize = (): void => {
    this.resizeSignal.update(v => v + 1);
  };

  constructor() {
    // Usamos ResizeObserver para una detección ultra-fluida.
    // No usamos runOutsideAngular para asegurar que los cambios de señales
    // marquen las vistas como sucias inmediatamente durante el resize.
    const obs = new ResizeObserver(() => {
      this.resizeSignal.update(v => v + 1);
    });
    obs.observe(document.body);
  }

  ngOnDestroy(): void {
    // ResizeObserver se limpia automáticamente al destruir el servicio (root)
  }
}
