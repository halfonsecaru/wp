import { 
  Directive, 
  ViewContainerRef, 
  ComponentRef, 
  ElementRef, 
  Renderer2,
  input,
  effect,
  inject
} from '@angular/core';
import { AlfSpinner } from '../../components/alf-spinner/alf-spinner';
import { AlfLoadingInterface } from '../../interfaces/alf-loading.interface';
import { AlfLoadingModeEnum, AlfSpinnerStrokeWidthEnum } from '../../enums';

/**
 * Directiva de carga unificada para la librería AlfComponents
 * ✅ Effect como propiedad de clase (Injection Context)
 * ✅ Sin funciones anidadas
 * ✅ Modificadores de acceso explícitos
 */
@Directive({
  selector: '[alfLoading]',
  standalone: true,
})
export class AlfLoadingDirective {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  public readonly config = input<boolean | AlfLoadingInterface>(false, { alias: 'alfLoading' });
  public readonly thickness = input<AlfSpinnerStrokeWidthEnum | undefined>(undefined, { alias: 'alfLoadingThickness' });

  private spinnerRef?: ComponentRef<AlfSpinner>;

  /**
   * Efecto reactivo declarado como propiedad de clase.
   * Monitoriza el estado de la configuración e invoca al manejador.
   */
  private readonly loadingEffect = effect(() => {
    const cfg = this.config();
    this.toggleLoading(typeof cfg === 'boolean' ? cfg : cfg?.isLoading);
  });

  /**
   * Decide si mostrar u ocultar basado en el estado (Lógica extraída).
   */
  private toggleLoading = (isLoading: boolean | undefined): void => {
    if (isLoading) {
      this.showLoading();
    } else {
      this.hideLoading();
    }
  };

  /**
   * Crea e inyecta el AlfSpinner.
   */
  private showLoading = (): void => {
    if (this.spinnerRef) return;

    const currentCfg = this.config();
    const currentThickness = this.thickness();

    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
    this.renderer.addClass(this.el.nativeElement, 'alf-loading-active');

    this.spinnerRef = this.viewContainerRef.createComponent(AlfSpinner);
    
    if (typeof currentCfg !== 'boolean') {
      const mode = currentCfg.mode || AlfLoadingModeEnum.Inline;
      this.spinnerRef.setInput('color', currentCfg.spinnerColor);
      this.spinnerRef.setInput('size', currentCfg.spinnerSize);
      
      const thicknessValue = currentCfg.spinnerStrokeWidth || 
                             currentThickness || 
                             (mode === AlfLoadingModeEnum.Overlay ? AlfSpinnerStrokeWidthEnum.Thick : AlfSpinnerStrokeWidthEnum.Base);
      
      this.spinnerRef.setInput('strokeWidth', thicknessValue);
    } else {
      this.spinnerRef.setInput('strokeWidth', currentThickness || AlfSpinnerStrokeWidthEnum.Base);
    }

    this.renderer.appendChild(this.el.nativeElement, this.spinnerRef.location.nativeElement);
  };

  /**
   * Elimina el AlfSpinner.
   */
  private hideLoading = (): void => {
    if (!this.spinnerRef) return;

    this.renderer.removeStyle(this.el.nativeElement, 'pointer-events');
    this.renderer.removeClass(this.el.nativeElement, 'alf-loading-active');
    
    this.spinnerRef.destroy();
    this.spinnerRef = undefined;
  };
}
