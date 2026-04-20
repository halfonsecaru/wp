import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlfBaseComponent } from '@alfcomponents/base';
import { AlfTabContentInterface } from '../interfaces/alf-tabs.interface';
import { ALF_TABS_TOKEN } from '../tokens';

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
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlfTabContentComponent extends AlfBaseComponent<AlfTabContentInterface> {
  /** Miembro abstracto obligatorio de AlfBaseComponent */
  protected override readonly resolvedPredefined: Signal<AlfTabContentInterface | undefined> = signal(undefined).asReadonly();

  /** Referencia al coordinador padre (Broken circle via Token) */
  private readonly parent = inject(ALF_TABS_TOKEN);

  /** Índice de este panel */
  public readonly index = input.required<number>();

  /** Control de renderizado diferido */
  public readonly lazy = input<boolean>(false);

  /** Tabindex para accesibilidad */
  public readonly tabIndex = input<string>('0');

  /** IDs vinculados al sistema del padre */
  public readonly panelId = computed(() => this.parent.getPanelId(this.index()));
  public readonly labeledBy = computed(() => this.parent.getTabId(this.index()));

  /** Determina si este panel es el activo (sigue al contentIndex del padre) */
  public readonly isActive = computed(() => this.parent.contentIndex() === this.index());

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
