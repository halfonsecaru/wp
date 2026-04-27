import { Component, input, signal, computed, inject } from '@angular/core';
import { AlfBaseConfiguration } from '@alfcomponents/base';
import { AlfSingleTabInterface } from '../../interfaces/alf-tabs.interface';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { AlfTabsContainerComponent } from '../../alf-tabs-container';
import { ALF_TAB_CONTENT_DEFAULT } from '../../predefined/alf-tabs-container.predefined';

@Component({
  selector: 'alf-tab',
  standalone: true,
  imports: [],
  templateUrl: './alf-tab.html',
  styleUrl: './alf-tab.scss'
})
export class AlfTabComponent extends AlfBaseConfiguration<AlfSingleTabInterface> {
  protected readonly visualPrefix = visualprefixEnum.TabsContent;

  public override readonly inputConfig = input<AlfSingleTabInterface>(ALF_TAB_CONTENT_DEFAULT as AlfSingleTabInterface);

  /**
   * Nombre de la pestaña.
   */
  public readonly tabName = input.required<string>();

  /**
   * Indica si se debe aplicar un efecto de agrandamiento al entrar.
   */
  public readonly expandHeight = input<boolean>(false);

  /**
   * Estado de visibilidad (controlado por el contenedor).
   */
  public readonly isActive = signal<boolean>(false);

  /**
   * Referencia al contenedor padre para obtener la configuración de animaciones por defecto.
   */
  private readonly container = inject(AlfTabsContainerComponent, { optional: true });

  /**
   * Configuración de animaciones para el contenido (controlado por el contenedor).
   */
  public readonly parentContentAnimations = signal<AlfAnimateCssInterface | undefined>(undefined);

  /**
   * Configuración de animaciones final (prioridad: específica de la pestaña > general del contenedor).
   */
  protected readonly effectiveAnimations = computed(() => {
    return this.inputConfig()?.animations ?? this.parentContentAnimations();
  });

  /**
   * Estilos de animación calculados.
   */
  protected readonly animationStyle = computed(() => {
    const anim = this.effectiveAnimations();
    if (!anim) return '';
    const declarations: string[] = [];
    if (anim.duration) declarations.push(`--animate-duration: ${anim.duration};`);
    if (anim.delay) declarations.push(`--animate-delay: ${anim.delay};`);
    return declarations.join(' ');
  });
}
