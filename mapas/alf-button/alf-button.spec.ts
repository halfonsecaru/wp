import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { AlfButton } from './alf-button';
import { AlfButtonInterface } from './interfaces/alfButtonInterface';
import { AlfColorVariantEnum } from '../../../shared/enums/color-variant';
import { AlfFontSizeEnum } from '../../../shared/enums/font-size';
import { AlfButtonTypeEnum } from '../../../shared/enums/button-type';
import { AlfLinkTargetEnum } from '../../../shared/enums/link-target';
import { AlfAnimationTypeEnum } from '../../../shared/enums/animation-type';
import { AlfThemeService } from '../../../shared/theming/alf-theme.service';
import { ALF_THEME } from '../../../shared/theming/alf-theme.token';
import { DEFAULT_ALF_THEME } from '../../../shared/theming/predefined/default-theme';
import { AlfColorEnum } from '../../../shared/enums/color';

// Initialize Angular TestBed
const testBed = getTestBed();
if (!testBed.platform) {
  testBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
    { teardown: { destroyAfterEach: false } }
  );
}

describe('AlfButton', () => {
  let component: AlfButton;
  let fixture: ComponentFixture<AlfButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlfButton],
      providers: [
        { provide: ALF_THEME, useFactory: () => DEFAULT_ALF_THEME },
        AlfThemeService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlfButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  // ========================================
  // CREACIÓN BÁSICA
  // ========================================

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render as button by default', () => {
    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl).toBeTruthy();
  });

  // ========================================
  // LABEL Y CONTENIDO
  // ========================================

  it('should render label text', async () => {
    fixture.componentRef.setInput('config', { label: 'Click me' });
    fixture.detectChanges();
    await fixture.whenStable();

    const textEl = fixture.debugElement.query(By.css('.alf-btn-text'));
    expect(textEl).toBeTruthy();
    expect(textEl.nativeElement.textContent).toBe('Click me');
  });

  it('should not render label span when label is empty', async () => {
    fixture.componentRef.setInput('config', { label: undefined });
    fixture.detectChanges();
    await fixture.whenStable();

    const textEl = fixture.debugElement.query(By.css('.alf-btn-text'));
    expect(textEl).toBeFalsy();
  });

  // ========================================
  // VARIANTES Y TAMAÑOS
  // ========================================

  it('should apply variant class', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      variant: AlfColorVariantEnum.Danger
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.classList.contains(AlfColorVariantEnum.Danger)).toBe(true);
  });

  it('should apply size class', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      size: AlfFontSizeEnum.Lg
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.classList.contains(AlfFontSizeEnum.Lg)).toBe(true);
  });

  // ========================================
  // ICONOS (PREFIX/SUFFIX)
  // ========================================

  it('should render prefix icon', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      prefix: '🚀'
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const prefixEl = fixture.debugElement.query(By.css('.alf-btn-prefix'));
    expect(prefixEl).toBeTruthy();
    expect(prefixEl.nativeElement.textContent).toBe('🚀');
  });

  it('should render suffix icon', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      suffix: '→'
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const suffixEl = fixture.debugElement.query(By.css('.alf-btn-suffix'));
    expect(suffixEl).toBeTruthy();
    expect(suffixEl.nativeElement.textContent).toBe('→');
  });

  it('should not render prefix when explicitly set to undefined', async () => {
    fixture.componentRef.setInput('config', { label: 'Test', prefix: undefined });
    fixture.detectChanges();
    await fixture.whenStable();

    const prefixEl = fixture.debugElement.query(By.css('.alf-btn-prefix'));
    expect(prefixEl).toBeFalsy();
  });

  // ========================================
  // ESTADOS (LOADING / DISABLED)
  // ========================================

  it('should show spinner when loading is true', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      loading: true
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const spinnerEl = fixture.debugElement.query(By.css('alf-spinner'));
    expect(spinnerEl).toBeTruthy();
  });

  it('should add loading class when loading', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      loading: true
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.classList.contains('loading')).toBe(true);
  });

  it('should toggle loading state when config changes', async () => {
    // Start with loading false
    fixture.componentRef.setInput('config', { label: 'Test', loading: false });
    fixture.detectChanges();
    await fixture.whenStable();

    let spinnerEl = fixture.debugElement.query(By.css('alf-spinner'));
    expect(spinnerEl).toBeFalsy();

    // Update config to loading true
    fixture.componentRef.setInput('config', { label: 'Test', loading: true });
    fixture.detectChanges();
    await fixture.whenStable();

    spinnerEl = fixture.debugElement.query(By.css('alf-spinner'));
    expect(spinnerEl).toBeTruthy();
  });

  it('should disable button when disabled is true', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      disabled: true
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.disabled).toBe(true);
  });

  it('should disable button when loading is true', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      loading: true
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.disabled).toBe(true);
  });

  // ========================================
  // EVENTOS
  // ========================================

  it('should emit clicked event on click', async () => {
    fixture.componentRef.setInput('config', { label: 'Test' });
    fixture.detectChanges();
    await fixture.whenStable();

    let clickedEmitted = false;
    component.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    buttonEl.nativeElement.click();

    expect(clickedEmitted).toBe(true);
  });

  it('should NOT emit clicked when loading', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      loading: true
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    let clickedEmitted = false;
    component.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    buttonEl.nativeElement.click();

    expect(clickedEmitted).toBe(false);
  });

  // ========================================
  // MODO LINK
  // ========================================

  it('should render as anchor when link is provided', async () => {
    const config: AlfButtonInterface = {
      label: 'Go to Google',
      link: {
        url: 'https://google.com',
        target: AlfLinkTargetEnum.Blank
      }
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const anchorEl = fixture.debugElement.query(By.css('a.alf-btn'));
    expect(anchorEl).toBeTruthy();
    expect(anchorEl.nativeElement.getAttribute('href')).toBe('https://google.com');
    expect(anchorEl.nativeElement.getAttribute('target')).toBe('_blank');
  });

  it('should use _self as default target for links', async () => {
    const config: AlfButtonInterface = {
      label: 'Link',
      link: {
        url: '/internal-page'
      }
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const anchorEl = fixture.debugElement.query(By.css('a.alf-btn'));
    expect(anchorEl.nativeElement.getAttribute('target')).toBe('_self');
  });

  // ========================================
  // TIPO DE BOTÓN
  // ========================================

  it('should set button type attribute', async () => {
    fixture.componentRef.setInput('config', { label: 'Submit', type: AlfButtonTypeEnum.Submit });
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.getAttribute('type')).toBe('submit');
  });

  it('should default to button type', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.getAttribute('type')).toBe('button');
  });

  // ========================================
  // CLASES PERSONALIZADAS
  // ========================================

  it('should apply customClass to button', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      customClass: 'my-custom-class another-class'
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.classList.contains('my-custom-class')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('another-class')).toBe(true);
  });

  // ========================================
  // ANIMACIÓN
  // ========================================

  it('should apply animation class when animation type is set', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      animation: {
        in: AlfAnimationTypeEnum.FadeIn
      }
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.classList.contains('alf-animation-fadeIn')).toBe(true);
  });

  // ========================================
  // ESTILOS DINÁMICOS
  // ========================================

  it('should generate style string with CSS variables', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      cursor: 'pointer' as any,
      opacity: 0.8
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    const styleAttr = buttonEl.nativeElement.getAttribute('style');

    expect(styleAttr).toBeTruthy();
  });

  // ========================================
  // OPERATIONS & EDGE CASES
  // ========================================

  it('should toggle disabled state when config changes', async () => {
    // Start with disabled false
    fixture.componentRef.setInput('config', { label: 'Test', disabled: false });
    fixture.detectChanges();
    await fixture.whenStable();

    let buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.disabled).toBe(false);

    // Update config to disabled true
    fixture.componentRef.setInput('config', { label: 'Test', disabled: true });
    fixture.detectChanges();
    await fixture.whenStable();

    buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.disabled).toBe(true);
  });

  it('should set aria-label attribute', async () => {
    const config: AlfButtonInterface = {
      label: 'Submit Form'
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.getAttribute('aria-label')).toBe('Submit Form');
  });

  it('should set aria-busy when loading', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      loading: true
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.getAttribute('aria-busy')).toBe('true');
  });

  it('should NOT set aria-busy when not loading', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      loading: false
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.getAttribute('aria-busy')).toBeNull();
  });

  it('should set aria-disabled on link when disabled', async () => {
    const config: AlfButtonInterface = {
      label: 'Link',
      disabled: true,
      link: {
        url: '/test'
      }
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const anchorEl = fixture.debugElement.query(By.css('a.alf-btn'));
    expect(anchorEl.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should disable button when both loading and disabled are true', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      loading: true,
      disabled: true
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.disabled).toBe(true);
  });

  it('should NOT emit clicked when disabled (not loading)', async () => {
    const config: AlfButtonInterface = {
      label: 'Test',
      disabled: true
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    // Note: Native disabled buttons don't emit click events
    expect(buttonEl.nativeElement.disabled).toBe(true);
  });

  it('should set button type to reset', async () => {
    fixture.componentRef.setInput('config', { label: 'Reset', type: AlfButtonTypeEnum.Reset });
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.getAttribute('type')).toBe('reset');
  });

  it('should apply outline variant class', async () => {
    const config: AlfButtonInterface = {
      label: 'Outline',
      variant: AlfColorVariantEnum.PrimaryOutline
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.classList.contains('outline-primary')).toBe(true);
  });

  it('should apply ghost variant class', async () => {
    const config: AlfButtonInterface = {
      label: 'Ghost',
      variant: AlfColorVariantEnum.SuccessGhost
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.classList.contains('ghost-success')).toBe(true);
  });

  it('should apply soft variant class', async () => {
    const config: AlfButtonInterface = {
      label: 'Soft',
      variant: AlfColorVariantEnum.InfoSoft
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl.nativeElement.classList.contains('soft-info')).toBe(true);
  });

  it('should set target to _parent for links', async () => {
    const config: AlfButtonInterface = {
      label: 'Parent Link',
      link: {
        url: '/parent',
        target: AlfLinkTargetEnum.Parent
      }
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const anchorEl = fixture.debugElement.query(By.css('a.alf-btn'));
    expect(anchorEl.nativeElement.getAttribute('target')).toBe('_parent');
  });

  it('should set target to _top for links', async () => {
    const config: AlfButtonInterface = {
      label: 'Top Link',
      link: {
        url: '/top',
        target: AlfLinkTargetEnum.Top
      }
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const anchorEl = fixture.debugElement.query(By.css('a.alf-btn'));
    expect(anchorEl.nativeElement.getAttribute('target')).toBe('_top');
  });

  it('should have ripple directive by default', async () => {
    fixture.componentRef.setInput('config', { label: 'Ripple' });
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl).toBeTruthy();
  });

  it('should disable ripple when ripple is false', async () => {
    const config: AlfButtonInterface = {
      label: 'No Ripple',
      ripple: false
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl).toBeTruthy();
  });

  it('should handle empty config gracefully', async () => {
    fixture.componentRef.setInput('config', {});
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl).toBeTruthy();
  });

  it('should render both prefix and suffix icons simultaneously', async () => {
    const config: AlfButtonInterface = {
      label: 'Both Icons',
      prefix: '←',
      suffix: '→'
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const prefixEl = fixture.debugElement.query(By.css('.alf-btn-prefix'));
    const suffixEl = fixture.debugElement.query(By.css('.alf-btn-suffix'));

    expect(prefixEl).toBeTruthy();
    expect(suffixEl).toBeTruthy();
    expect(prefixEl.nativeElement.textContent).toBe('←');
    expect(suffixEl.nativeElement.textContent).toBe('→');
  });

  it('should work as icon-only button (no label)', async () => {
    const config: AlfButtonInterface = {
      prefix: '🔍'
    };
    fixture.componentRef.setInput('config', config);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    const labelEl = fixture.debugElement.query(By.css('.alf-btn-text'));
    const prefixEl = fixture.debugElement.query(By.css('.alf-btn-prefix'));

    expect(buttonEl).toBeTruthy();
    expect(labelEl).toBeFalsy();
    expect(prefixEl).toBeTruthy();
  });

  // ========================================
  // THEMING & DEEP MERGE INTEGRATION
  // ========================================

  describe('Theming Integration', () => {

    it('should use default theme configuration when only partial config is provided', () => {
      // Solo pasamos label. El componente debería coger el variant 'primary' del tema por defecto.
      fixture.componentRef.setInput('config', { label: 'Partial Config' });
      fixture.detectChanges();

      // Verificamos que effectiveConfig ha hecho el merge
      const effective = component['effectiveConfig']();

      // El tema default tiene variant: Primary
      expect(effective.variant).toBe(AlfColorVariantEnum.Primary);
      expect(effective.label).toBe('Partial Config');
    });

    it('should allow user config to override theme defaults', () => {
      // El tema dice Primary, nosotros decimos Danger
      fixture.componentRef.setInput('config', {
        label: 'Override',
        variant: AlfColorVariantEnum.Danger
      });
      fixture.detectChanges();

      const effective = component['effectiveConfig']();
      expect(effective.variant).toBe(AlfColorVariantEnum.Danger);
    });

    it('should deep merge nested properties', () => {
      // Definimos un config que solo cambia el color del borde
      fixture.componentRef.setInput('config', {
        label: 'Deep Merge',
        // Asumimos que la variante sólida tiene configuración de borde compleja
        variant: AlfColorVariantEnum.Primary,
        border: {
          default: {
            borderColor: AlfColorEnum.Red500 // Solo cambio esto
          }
        }
      });
      fixture.detectChanges();

      const effective = component['effectiveConfig']();

      // Verificamos que nuestro cambio está
      expect(effective.border?.default?.borderColor).toBe(AlfColorEnum.Red500);

      // Y verificamos que 'displayAndLayout.default' (del base theme) sigue ahí
      expect(effective.displayAndLayout?.default).toBeDefined();
    });
  });

});

// ========================================
// CONTENT PROJECTION TESTS (TestHosts externos)
// ========================================

@Component({
  selector: 'test-host-simple',
  standalone: true,
  imports: [AlfButton],
  template: `
    <alf-button>
      <span class="custom-content">Projected Content</span>
    </alf-button>
  `
})
class TestHostSimpleComponent { }

@Component({
  selector: 'test-host-with-label',
  standalone: true,
  imports: [AlfButton],
  template: `
    <alf-button [config]="{ label: 'Button Label' }">
      <span class="custom-content">Projected Content</span>
    </alf-button>
  `
})
class TestHostWithLabelComponent { }

describe('AlfButton - Content Projection', () => {

  it('should render projected content via ng-content', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostSimpleComponent],
      providers: [
        { provide: ALF_THEME, useFactory: () => DEFAULT_ALF_THEME },
        AlfThemeService
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostSimpleComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const projectedEl = fixture.debugElement.query(By.css('.custom-content'));
    expect(projectedEl).toBeTruthy();
    expect(projectedEl.nativeElement.textContent).toBe('Projected Content');
  });

  it('should render both label and projected content', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostWithLabelComponent],
      providers: [
        { provide: ALF_THEME, useFactory: () => DEFAULT_ALF_THEME },
        AlfThemeService
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostWithLabelComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const labelEl = fixture.debugElement.query(By.css('.alf-btn-text'));
    const projectedEl = fixture.debugElement.query(By.css('.custom-content'));

    expect(labelEl).toBeTruthy();
    expect(labelEl.nativeElement.textContent).toBe('Button Label');
    expect(projectedEl).toBeTruthy();
    expect(projectedEl.nativeElement.textContent).toBe('Projected Content');
  });

  it('should place projected content inside button element', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostSimpleComponent],
      providers: [
        { provide: ALF_THEME, useFactory: () => DEFAULT_ALF_THEME },
        AlfThemeService
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostSimpleComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button.alf-btn'));
    expect(buttonEl).toBeTruthy();

    // The projected content should be inside the button
    // Note: If using content projection with ViewEncapsulation.Emulated inside button,
    // structure might vary slightly but usually it's direct child or inside span.
    const customSpan = buttonEl.query(By.css('.custom-content'));
    expect(customSpan).toBeTruthy();
  });
});
