import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[alfPortal]',
  standalone: true
})
export class AlfPortalDirective {
  /** Referencia del contenedor y herramientas de renderizado */
  private readonly vcr = inject(ViewContainerRef);

  /** Template a renderizar de forma dinámica */
  public readonly template = input<TemplateRef<any> | null>(null, { alias: 'alfPortal' });

  constructor() {
    // El efecto se inicializa automáticamente al ser una propiedad de clase
  }

  /**
   * Efecto reactivo para gestionar el renderizado del portal.
   * Se ejecuta cada vez que el template cambia.
   */
  private readonly _renderEffect = effect(() => {
    const t = this.template();
    this.vcr.clear();
    if (t) {
      this.vcr.createEmbeddedView(t);
    }
  });
}
