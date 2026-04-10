import { Directive, TemplateRef, inject, Input, signal } from '@angular/core';

/**
 * @directive AlfTabContentDirective
 * @description Directiva para asignar contenido dinámico a un tab.
 * Versión Élite: Máxima compatibilidad JIT/Vitest y Rigor Técnico.
 */
@Directive({
    selector: '[alfTabContent]',
    standalone: true
})
export class AlfTabContentDirective {
    /**
     * Referencia a la plantilla.
     */
    public readonly templateRef = inject(TemplateRef<unknown>);

    /**
     * ID del tab vinculado.
     * Usamos el Patrón Puente para asegurar compatibilidad en tests.
     */
    @Input({ alias: 'alfTabContent', required: true })
    public set alfTabContentInput(value: string) {
        this._tabId.set(value);
    }

    /**
     * Signal interno.
     */
    private readonly _tabId = signal<string>('');

    /**
     * Exponemos el valor como signal readonly.
     */
    public readonly tabId = this._tabId.asReadonly();
}
