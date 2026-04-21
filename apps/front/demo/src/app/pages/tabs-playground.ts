import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlfTabsComponent,
  AlfTabComponent,
  AlfTabsInterface,
  AlfTabsPositionEnum,
  AlfTabsVisualTypeEnum,
  AlfIconsUnicodeIconEnum,
  AlfColorEnum,
  AlfRadiusEnum,
  AlfPxEnum,
  AlfBackgroundSizeEnum,
  AlfPositionEnum,
  AlfBorderStyleEnum,
  AlfAnimationTypeEnum
} from '@alfcomponents';

/**
 * TabsPlaygroundPage
 * Prop-Editor Élite con Soporte Nativo para BackgroundImage.
 */
@Component({
  selector: 'app-tabs-playground',
  standalone: true,
  imports: [CommonModule, AlfTabsComponent, AlfTabComponent],
  template: `
    <div class="playground-container">
      
      <!-- HEADER -->
      <header class="playground-header">
        <h1>AlfTabs <span class="accent">Designer</span> <span class="badge">PRO</span></h1>
        <div class="header-actions">
          <button class="btn-reset" (click)="resetConfig()">Resetear ADN</button>
        </div>
      </header>

      <div class="playground-content">

        <!-- NIVEL 1: PESTAÑAS MAESTRAS -->
        <section class="editor-section">
          <alf-tabs [defineComponent]="{ visualType: tabsVisualType.Master }">
            
            <!-- TABA: DEFINE -->
            <alf-tab [defineComponent]="{ label: 'DEFINE', prefix: icons.Sparkle }">
              <div class="nested-editor">
                
                <alf-tabs [position]="positionEnum.Left" [defineComponent]="{ visualType: tabsVisualType.Master }">
                  
                  <!-- FONDO (Con soporte nativo para Graident/Image) -->
                  <alf-tab [defineComponent]="{ label: 'Fondo' }">
                    <div class="category-panel">
                      <h4>Estética de Fondo (Nativo)</h4>
                      <div class="editor-grid">
                        <div class="control-group">
                          <label>Color Base</label>
                          <select (change)="updateProp('backgrounds', 'default', 'backgroundColor', $event)">
                            @for (item of colorList; track item.value) {
                              <option [value]="item.value" [selected]="bgDefault().backgroundColor === item.value">{{item.key}}</option>
                            }
                          </select>
                        </div>
                        <div class="control-group">
                          <label>Color Hover</label>
                          <select (change)="updateProp('backgrounds', 'hover', 'backgroundColor', $event)">
                            @for (item of colorList; track item.value) {
                              <option [value]="item.value" [selected]="bgHover().backgroundColor === item.value">{{item.key}}</option>
                            }
                          </select>
                        </div>
                        <div class="control-group">
                          <label>Background Size</label>
                          <select (change)="updateProp('backgrounds', 'default', 'backgroundSize', $event)">
                            @for (item of bgSizeList; track item.value) {
                              <option [value]="item.value" [selected]="bgDefault().backgroundSize === item.value">{{item.key}}</option>
                            }
                          </select>
                        </div>

                        <!-- NUEVA PROPIEDAD: BACKGROUND IMAGE -->
                        <div class="control-group full-width">
                          <label>Imagen / Degradado (Nativo)</label>
                          <div class="helper-text">
                            <button class="btn-example" (click)="applyGradientExample()">Aplicar Ejemplo</button>
                          </div>
                          <textarea 
                            [value]="bgDefault().backgroundImage || ''"
                            placeholder="linear-gradient(135deg, #474f5a 0%, #334155 100%)"
                            (input)="updateBgImage($event)">
                          </textarea>
                          <small>Se mapea a la propiedad <code>backgroundImage</code> del contrato.</small>
                        </div>
                      </div>
                    </div>
                  </alf-tab>

                  <!-- BORDES -->
                  <alf-tab [defineComponent]="{ label: 'Bordes' }">
                    <div class="category-panel">
                      <h4>Bordes y Radios</h4>
                      <div class="editor-grid">
                        <div class="control-group">
                          <label>Radio (Esquinas)</label>
                          <select (change)="updateProp('border', 'default', 'borderRadius', $event)">
                            @for (item of radiusList; track item.value) {
                              <option [value]="item.value" [selected]="borderDefault().borderRadius === item.value">{{item.key}}</option>
                            }
                          </select>
                        </div>
                        <div class="control-group">
                          <label>Grosor</label>
                          <select (change)="updateProp('border', 'default', 'borderWidth', $event)">
                            @for (item of pxList; track item.value) {
                              <option [value]="item.value" [selected]="borderDefault().borderWidth === item.value">{{item.key}}</option>
                            }
                          </select>
                        </div>
                        <div class="control-group">
                          <label>Color Borde</label>
                          <select (change)="updateProp('border', 'default', 'borderColor', $event)">
                            @for (item of colorList; track item.value) {
                              <option [value]="item.value" [selected]="borderDefault().borderColor === item.value">{{item.key}}</option>
                            }
                          </select>
                        </div>
                      </div>
                    </div>
                  </alf-tab>

                </alf-tabs>
              </div>
            </alf-tab>

            <!-- TABA: CODE -->
            <alf-tab [defineComponent]="{ label: 'CODE', prefix: icons.Zap }">
              <div class="code-tab-panel">
                <h4>Código de Configuración (ADN)</h4>
                <div class="code-container">
                  <div class="code-header">
                    <span>config.ts</span>
                    <span class="lang-ts">TypeScript</span>
                  </div>
                  <pre class="code-block"><code>{{ codeSnapshot() }}</code></pre>
                </div>
              </div>
            </alf-tab>

          </alf-tabs>
        </section>

        <!-- PREVIEW AREA -->
        <section class="preview-section">
          <div class="section-label">Live Preview</div>
          <div class="preview-canvas">
            <alf-tabs [defineComponent]="config()">
              <alf-tab [defineComponent]="{ label: 'una', prefix: '1' }">
                <div><h2>Sección una</h2><p>Contenido reactivo nativo.</p></div>
              </alf-tab>
              <alf-tab [defineComponent]="{ label: 'dos', prefix: '2' }">
                <div><h2>Sección dos</h2><p>Contenido reactivo nativo.</p></div>
              </alf-tab>
              <alf-tab [defineComponent]="{ label: 'tres', prefix: '3' }">
                <div><h2>Sección tres</h2><p>Contenido reactivo nativo.</p></div>
              </alf-tab>
              <alf-tab [defineComponent]="{ label: 'cuatro', prefix: '4' }">
                <div><h2>Sección cuatro</h2><p>Contenido reactivo nativo.</p></div>
              </alf-tab>
            </alf-tabs>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: [`
    .playground-container { display: flex; flex-direction: column; height: 100vh; background: #f8fafc; font-family: 'Inter', sans-serif; overflow: hidden; }
    .playground-header {
      background: #0f172a; color: white; padding: 0.75rem 2rem; display: flex; justify-content: space-between; align-items: center;
      h1 { margin: 0; font-size: 1.1rem; }
      .accent { color: #3b82f6; }
      .badge { font-size: 0.6rem; background: #3b82f6; padding: 2px 6px; border-radius: 4px; margin-left: 8px; }
      .btn-reset { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.75rem; cursor: pointer; }
    }
    .playground-content { flex: 1; display: flex; flex-direction: column; padding: 1.5rem; gap: 1.5rem; overflow-y: auto; }
    .editor-section { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden; }
    .nested-editor { padding: 1rem 0; }
    .category-panel { padding: 0 1.5rem; h4 { margin: 0 0 1rem; font-size: 0.9rem; color: #0f172a; } }
    .editor-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
    .control-group {
      display: flex; flex-direction: column; gap: 0.4rem;
      label { font-size: 0.7rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
      select, textarea { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 0.5rem; border-radius: 6px; font-size: 0.8rem; outline: none; }
      textarea { min-height: 50px; font-family: monospace; }
      &.full-width { grid-column: 1 / -1; }
    }
    .helper-text { display: flex; justify-content: flex-end; margin-bottom: 0.2rem; .btn-example { background: #3b82f6; color: white; border: none; padding: 2px 6px; border-radius: 4px; font-size: 0.6rem; cursor: pointer; } }
    
    .code-tab-panel { padding: 1.5rem; h4 { margin: 0 0 1rem; } }
    .code-container {
      background: #0f172a; border-radius: 10px; overflow: hidden;
      .code-header { background: #1e293b; padding: 0.4rem 1rem; display: flex; justify-content: space-between; font-size: 0.65rem; color: #94a3b8; }
      .code-block { margin: 0; padding: 1.5rem; overflow-x: auto; color: #38bdf8; font-family: 'Fira Code', monospace; font-size: 0.8rem; }
    }

    .preview-section { flex: 1; display: flex; flex-direction: column; .section-label { font-size: 0.7rem; font-weight: 800; color: #64748b; margin-bottom: 0.5rem; padding-left: 0.5rem; border-left: 3px solid #3b82f6; } }
    .preview-canvas { flex: 1; background: white; border-radius: 12px; padding: 2rem; border: 1px solid #e2e8f0; display: flex; justify-content: center; align-items: flex-start; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPlaygroundPage {
  protected readonly icons = AlfIconsUnicodeIconEnum;
  protected readonly positionEnum = AlfTabsPositionEnum;
  protected readonly tabsVisualType = AlfTabsVisualTypeEnum;

  protected readonly colorList = Object.entries(AlfColorEnum).map(([key, value]) => ({ key, value }));
  protected readonly radiusList = Object.entries(AlfRadiusEnum).map(([key, value]) => ({ key, value }));
  protected readonly pxList = Object.entries(AlfPxEnum).map(([key, value]) => ({ key, value }));
  protected readonly bgSizeList = Object.entries(AlfBackgroundSizeEnum).map(([key, value]) => ({ key, value }));
  protected readonly posList = Object.entries(AlfPositionEnum).map(([key, value]) => ({ key, value }));
  protected readonly borderStyleList = Object.entries(AlfBorderStyleEnum).map(([key, value]) => ({ key, value }));
  protected readonly animList = Object.entries(AlfAnimationTypeEnum).map(([key, value]) => ({ key, value }));
  protected readonly visualTypeList = Object.entries(AlfTabsVisualTypeEnum).map(([key, value]) => ({ key, value }));

  public readonly config = signal<AlfTabsInterface>({
    visualType: AlfTabsVisualTypeEnum.Underline,
    brandColor: AlfColorEnum.Primary,
    backgrounds: {
      default: { backgroundColor: AlfColorEnum.White },
      hover: { backgroundColor: AlfColorEnum.White }
    },
    border: {
      default: { borderRadius: AlfRadiusEnum.Md, borderWidth: AlfPxEnum.Px1, borderColor: AlfColorEnum.Gray200 }
    }
  });

  protected readonly bgDefault = computed(() => this.config().backgrounds?.default || {});
  protected readonly bgHover = computed(() => this.config().backgrounds?.hover || {});
  protected readonly borderDefault = computed(() => this.config().border?.default || {});

  public readonly codeSnapshot = computed(() => {
    const json = JSON.stringify(this.config(), null, 2);
    return `public readonly tabsConfig = signal<AlfTabsInterface>(${json});`;
  });

  constructor() { }

  public updateProp(category: keyof AlfTabsInterface, state: string, prop: string, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.config.update(old => {
      const catObj = (old[category] as any) || {};
      const stateObj = catObj[state] || {};
      return { ...old, [category]: { ...catObj, [state]: { ...stateObj, [prop]: value } } };
    });
  }

  public updateBgImage(event: Event | string): void {
    const value = typeof event === 'string' ? event : (event.target as HTMLTextAreaElement).value;
    const sanitized = value.trim().replace(/;$/, '');
    this.config.update(old => ({
      ...old,
      backgrounds: {
        ...old.backgrounds,
        default: {
          ...old.backgrounds?.default,
          backgroundImage: sanitized || undefined
        }
      }
    }));
  }

  public applyGradientExample(): void {
    const example = 'linear-gradient(135deg, #474f5a 0%, #334155 100%)';
    this.updateBgImage(example);
  }

  public resetConfig(): void {
    this.config.set({
      visualType: AlfTabsVisualTypeEnum.Underline,
      brandColor: AlfColorEnum.Primary,
      backgrounds: { default: { backgroundColor: AlfColorEnum.White }, hover: { backgroundColor: AlfColorEnum.White } }
    });
  }
}
