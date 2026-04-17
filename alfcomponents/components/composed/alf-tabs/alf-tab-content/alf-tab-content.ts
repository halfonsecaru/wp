import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlfBaseComponent } from '@alfcomponents/base';
import { AlfTabContentInterface } from '../interfaces/alf-tabs.interface';
import { AlfTabsComponent } from '../alf-tabs';

/**
 * AlfTabContentComponent
 * Representa el panel de contenido asociado a una pestaña.
 */
@Component({
  selector: 'alf-tab-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alf-tab-content.html',
  styleUrl: './alf-tab-content.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlfTabContentComponent extends AlfBaseComponent<AlfTabContentInterface> {
  /** Miembro abstracto obligatorio de AlfBaseComponent */
  protected override readonly resolvedPredefined: Signal<AlfTabContentInterface | undefined> = signal(undefined).asReadonly();

  /** Referencia al coordinador padre */
  private readonly parent = inject(AlfTabsComponent);

  /** Índice de este panel */
  readonly index = input.required<number>();

  /** Control de renderizado diferido */
  readonly lazy = input<boolean>(false);

  /** Tabindex para accesibilidad */
  readonly tabIndex = input<string>('0');

  /** Determina si este panel es el activo (sigue al contentIndex del padre) */
  readonly isActive = computed(() => this.parent.contentIndex() === this.index());

  /** Determina si el panel debe estar presente en el DOM y visible */
  protected readonly shouldBeVisible = computed(() => this.isActive() || this.isExiting());

  /** Resuelve la configuración de animación final (Local vs Global del padre) */
  public override readonly resolvedAnimationsComputed = computed(() => {
    const local = this.resolvedConfigComputed()?.animations;
    const globalByParent = this.parent.configComputed()?.behavior?.defaultAnimations;
    return local ?? globalByParent;
  });

  /** Genera las clases de Animate.css según el estado */
  protected readonly animationClassesComputed = this.createAnimationClasses(this.isActive);

  constructor() {
    super();
    this.setupAnimationTrigger(this.isActive);
  }
}
