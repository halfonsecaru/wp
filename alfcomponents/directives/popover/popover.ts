import {
  Directive,
  ElementRef,
  Renderer2,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef,
  ComponentRef,
  Type,
  Injector,
  EnvironmentInjector,
  createComponent,
  inject,
  Input,
  signal
} from '@angular/core';
import { AlfPositionEnum } from '../../enums/alf-position.enum';
import { AlfColorEnum } from '../../enums/alf-color.enum';
import { AlfShadowEnum } from '../../enums/alf-shadow.enum';
import { AlfZIndexEnum } from '../../enums/alf-z-index.enum';
import { AlfRadiusEnum } from '../../enums/alf-radius.enum';

export interface AlfPopoverConfig {
  text?: string;
  template?: TemplateRef<any>;
  component?: Type<any>;
  componentInputs?: Record<string, any>;
  position?: AlfPositionEnum;
  trigger?: 'hover' | 'click';
  delay?: number;
  maxWidth?: string;
  backgroundColor?: AlfColorEnum;
  color?: AlfColorEnum;
}

@Directive({
  selector: '[alfPopover]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(click)': 'onClick($event)'
  }
})
export class AlfPopover implements OnDestroy {
  // Services
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly environmentInjector = inject(EnvironmentInjector);

  /**
   * Signal interno para configuración (Bridge pattern para Vitest/JIT)
   */
  private readonly _config = signal<AlfPopoverConfig | null>(null);

  /**
   * Input como puente JIT -> Signal
   */
  @Input({ required: true })
  public set alfPopover(value: AlfPopoverConfig) {
    this._config.set(value);
  }

  // State
  private popoverElement: HTMLElement | null = null;
  private embeddedView: EmbeddedViewRef<any> | null = null;
  private componentRef: ComponentRef<any> | null = null;
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private isVisible = false;

  // Constants
  private readonly offset = 10;
  private readonly defaultPosition = AlfPositionEnum.Auto;
  private readonly defaultDelay = 300;
  private readonly defaultMaxWidth = '500px';
  private readonly uniqueId = `alf-popover-${Math.random().toString(36).substring(2, 9)}`;

  // Default Colors and Styles
  private readonly defaultBgColor = AlfColorEnum.White;
  private readonly defaultTextColor = AlfColorEnum.Gray800;
  private readonly defaultBorderColor = AlfColorEnum.Gray200;

  constructor() { }

  public ngOnDestroy(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    this.hide();
  }

  protected onMouseEnter = (): void => {
    const config = this._config();
    if (!config || config.trigger === 'click') return;

    const delay = config.delay ?? this.defaultDelay;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.showTimeout = setTimeout(() => {
      this.show();
    }, delay);
  };

  protected onMouseLeave = (): void => {
    const config = this._config();
    if (!config || config.trigger === 'click') return;

    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    this.hideTimeout = setTimeout(() => {
      this.hide();
    }, 100);
  };

  protected onClick = (event: Event): void => {
    const config = this._config();
    if (!config || config.trigger !== 'click') return;

    event.stopPropagation();
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  };

  private show = (): void => {
    if (this.isVisible) return;

    const config = this._config();
    if (!config) return;

    const position = config.position ?? this.defaultPosition;
    const maxWidth = config.maxWidth ?? this.defaultMaxWidth;

    // A11y: Update Trigger State
    this.renderer.setAttribute(this.el.nativeElement, 'aria-expanded', 'true');
    this.renderer.setAttribute(this.el.nativeElement, 'aria-controls', this.uniqueId);

    // Create popover container
    this.popoverElement = this.renderer.createElement('div');
    this.renderer.setAttribute(this.popoverElement, 'id', this.uniqueId);
    this.renderer.setAttribute(this.popoverElement, 'role', config.trigger === 'click' ? 'dialog' : 'tooltip');

    if (config.trigger === 'click' && config.text) {
      this.renderer.setAttribute(this.popoverElement, 'aria-label', config.text);
    }

    this.applyPopoverStyles(maxWidth);

    // Render content
    if (config.text) {
      const textNode = this.renderer.createText(config.text);
      const textContainer = this.renderer.createElement('div');
      
      this.renderer.setStyle(textContainer, 'padding', '12px 16px');
      this.renderer.setStyle(textContainer, 'background-color', config.backgroundColor ?? this.defaultBgColor);
      this.renderer.setStyle(textContainer, 'color', config.color ?? this.defaultTextColor);
      this.renderer.setStyle(textContainer, 'border-radius', AlfRadiusEnum.Lg);
      this.renderer.setStyle(textContainer, 'border', `1px solid ${this.defaultBorderColor}`);
      this.renderer.setStyle(textContainer, 'white-space', 'pre-wrap');
      
      this.renderer.appendChild(textContainer, textNode);
      this.renderer.appendChild(this.popoverElement, textContainer);
    } else if (config.template) {
      this.embeddedView = this.viewContainer.createEmbeddedView(config.template);
      this.embeddedView.rootNodes.forEach(node => {
        this.renderer.appendChild(this.popoverElement, node);
      });
    } else if (config.component) {
      this.componentRef = createComponent(config.component, {
        environmentInjector: this.environmentInjector,
        elementInjector: this.injector
      });

      if (config.componentInputs) {
        Object.entries(config.componentInputs).forEach(([key, value]) => {
          this.componentRef!.setInput(key, value);
        });
      }

      this.renderer.appendChild(this.popoverElement, this.componentRef.location.nativeElement);
    }

    // Append to body
    this.renderer.appendChild(document.body, this.popoverElement);

    // Dynamic listeners
    this.renderer.listen(this.popoverElement, 'mouseenter', this.onPopoverMouseEnter);
    this.renderer.listen(this.popoverElement, 'mouseleave', this.onPopoverMouseLeave);

    // Position popover
    this.positionPopover(position);

    this.isVisible = true;

    if (config.trigger === 'click') {
      setTimeout(() => {
        document.addEventListener('click', this.handleClickOutside);
      }, 0);
    }

    // Animation and final position logic
    setTimeout(() => {
      this.positionPopover(position);
      this.animateShow();
    }, 50);
  };

  private onPopoverMouseEnter = (): void => {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  };

  private onPopoverMouseLeave = (): void => {
    this.hideTimeout = setTimeout(() => {
      this.hide();
    }, 100);
  };

  private hide = (): void => {
    if (!this.popoverElement || !this.isVisible) return;

    // A11y: Update Trigger State
    this.renderer.setAttribute(this.el.nativeElement, 'aria-expanded', 'false');
    this.renderer.removeAttribute(this.el.nativeElement, 'aria-controls');

    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside);

    this.animateHide(() => {
      if (this.popoverElement) {
        this.renderer.removeChild(document.body, this.popoverElement);
        this.popoverElement = null;
      }

      if (this.embeddedView) {
        this.embeddedView.destroy();
        this.embeddedView = null;
      }

      if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
      }

      this.isVisible = false;
    });
  };

  private animateShow = (): void => {
    if (!this.popoverElement) return;

    this.renderer.setStyle(this.popoverElement, 'pointer-events', 'auto');
    
    this.popoverElement.animate([
      { opacity: 0, transform: 'scale(0.95)' },
      { opacity: 1, transform: 'scale(1)' }
    ], {
      duration: 200,
      easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)'
    });

    this.renderer.setStyle(this.popoverElement, 'opacity', '1');
    this.renderer.setStyle(this.popoverElement, 'transform', 'scale(1)');
  };

  private animateHide = (onComplete: () => void): void => {
    if (!this.popoverElement) {
      onComplete();
      return;
    }

    const animation = this.popoverElement.animate([
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(0.95)' }
    ], {
      duration: 150,
      easing: 'ease-in'
    });

    animation.onfinish = onComplete;
  };

  private handleClickOutside = (event: Event): void => {
    if (this.popoverElement && !this.popoverElement.contains(event.target as Node) &&
      !this.el.nativeElement.contains(event.target as Node)) {
      this.hide();
    }
  };

  private applyPopoverStyles(maxWidth: string): void {
    if (!this.popoverElement) return;

    const styles: Record<string, string> = {
      'position': 'absolute',
      'padding': '0',
      'border-radius': AlfRadiusEnum.Lg,
      'z-index': AlfZIndexEnum.Max,
      'opacity': '0',
      'pointer-events': 'none',
      'box-shadow': AlfShadowEnum.Lg,
      'max-width': maxWidth,
      'max-height': '80vh',
      'overflow': 'auto',
      'transform-origin': 'center'
    };

    Object.entries(styles).forEach(([property, value]) => {
      this.renderer.setStyle(this.popoverElement, property, value);
    });
  }

  private positionPopover(position: AlfPositionEnum): void {
    if (!this.popoverElement) return;

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const popoverPos = this.popoverElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let finalPosition = position;

    // Resolve Auto position
    if (finalPosition === AlfPositionEnum.Auto) {
      const elementCenter = hostPos.top + (hostPos.height / 2);
      finalPosition = elementCenter > viewportHeight / 2 ? AlfPositionEnum.Top : AlfPositionEnum.Bottom;
    }

    // Auto-flip logic
    if (finalPosition === AlfPositionEnum.Top) {
      const spaceTop = hostPos.top - this.offset;
      const spaceBottom = viewportHeight - hostPos.bottom - this.offset;
      if (popoverPos.height > spaceTop && spaceBottom > spaceTop) {
        finalPosition = AlfPositionEnum.Bottom;
      }
    } else if (finalPosition === AlfPositionEnum.Bottom) {
      const spaceTop = hostPos.top - this.offset;
      const spaceBottom = viewportHeight - hostPos.bottom - this.offset;
      if (popoverPos.height > spaceBottom && spaceTop > spaceBottom) {
        finalPosition = AlfPositionEnum.Top;
      }
    }

    if (finalPosition === AlfPositionEnum.Left && hostPos.left - popoverPos.width - this.offset < 0) {
      finalPosition = AlfPositionEnum.Right;
    } else if (finalPosition === AlfPositionEnum.Right && hostPos.right + popoverPos.width + this.offset > viewportWidth) {
      finalPosition = AlfPositionEnum.Left;
    }

    // Calculate Coordinates
    let top = 0;
    let left = 0;
    let transformOrigin = 'center';

    switch (finalPosition) {
      case AlfPositionEnum.Top:
        top = hostPos.top - popoverPos.height - this.offset;
        left = hostPos.left + (hostPos.width - popoverPos.width) / 2;
        transformOrigin = 'bottom center';
        break;
      case AlfPositionEnum.Bottom:
        top = hostPos.bottom + this.offset;
        left = hostPos.left + (hostPos.width - popoverPos.width) / 2;
        transformOrigin = 'top center';
        break;
      case AlfPositionEnum.Left:
        top = hostPos.top + (hostPos.height - popoverPos.height) / 2;
        left = hostPos.left - popoverPos.width - this.offset;
        transformOrigin = 'right center';
        break;
      case AlfPositionEnum.Right:
        top = hostPos.top + (hostPos.height - popoverPos.height) / 2;
        left = hostPos.right + this.offset;
        transformOrigin = 'left center';
        break;
    }

    this.renderer.setStyle(this.popoverElement, 'transform-origin', transformOrigin);

    if (left < 10) left = 10;
    else if (left + popoverPos.width > viewportWidth - 10) left = viewportWidth - popoverPos.width - 10;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

    this.renderer.setStyle(this.popoverElement, 'top', `${top + scrollY}px`);
    this.renderer.setStyle(this.popoverElement, 'left', `${left + scrollX}px`);
  }
}
