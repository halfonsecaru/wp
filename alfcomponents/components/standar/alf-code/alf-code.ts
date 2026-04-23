import { Component, input, ElementRef, effect, AfterViewInit, ViewEncapsulation, signal, computed, output, viewChild } from '@angular/core';
import * as Prism from 'prismjs';

// Importar lenguajes comunes
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

declare const window: any;



/**
 * @component AlfCodeComponent
 * @description Componente para mostrar bloques de código con syntax highlighting
 * usando Prism.js y tema VS Code Dark Modern
 * 
 * @example
 * ```html
 * <alf-code 
 *   title="Basic Usage"
 *   [code]="myCodeString"
 *   language="typescript"
 *   (typeClick)="onTypeClick($event)">
 * </alf-code>
 * ```
 */
@Component({
  selector: 'alf-code',
  standalone: true,
  imports: [],
  templateUrl: './alf-code.html',
  styleUrl: './alf-code.scss',
  encapsulation: ViewEncapsulation.None
})
export class AlfCodeComponent {
  /** Título opcional del bloque de código */
  title = input<string>();

  /** Código a mostrar */
  code = input.required<string>();

  /** Lenguaje para syntax highlighting */
  language = input<string>('typescript');

  /** Mostrar números de línea */
  showLineNumbers = input<boolean>(false);

  /** Mostrar botón de copiar */
  showCopyButton = input<boolean>(true);

  /** Número máximo de líneas a mostrar (0 = sin límite) */
  maxLines = input<number>(0);

  /** Definiciones de tipos para hacer clickeables */
  typeDefinitions = input<Record<string, string>>({});

  /** Evento emitido al hacer clic en un tipo */
  typeClick = output<string>();

  /** Referencia al elemento de código */
  private readonly codeElement = viewChild<ElementRef<HTMLElement>>('codeElement');


  /** Estado del botón de copiar */
  protected copied = false;

  /** Estado de expansión del código */
  protected isExpanded = signal(false);

  /** Código truncado o completo según el estado */
  protected displayCode = computed(() => {
    const fullCode = this.code();
    const max = this.maxLines();

    if (max === 0 || this.isExpanded()) {
      return fullCode;
    }

    const lines = fullCode.split('\n');
    if (lines.length <= max) {
      return fullCode;
    }

    return lines.slice(0, max).join('\n') + '\n// ...';
  });

  /** Indica si el código está truncado */
  protected isTruncated = computed(() => {
    const max = this.maxLines();
    return max > 0 && this.code().split('\n').length > max;
  });

  /** Código resaltado final listo para el template */
  protected readonly highlightedHtml = computed(() => {
    const prismObj = (window as any).Prism || Prism;
    const code = this.displayCode();
    let lang = this.language().toLowerCase();

    // Normalización de lenguajes para Prism
    if (lang === 'html' || lang === 'xml') lang = 'markup';

    if (!prismObj || !prismObj.languages || !prismObj.languages[lang]) {
      return this.escapeHtml(code);
    }

    try {
      const highlighted = prismObj.highlight(code, prismObj.languages[lang], lang);
      return this.processAlfTypes(highlighted);
    } catch (e) {
      console.error('AlfCode: Error highlighting code:', e);
      return this.escapeHtml(code);
    }
  });

  constructor() { }


  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  /**
   * Colorea tipos (Enums e Interfaces) que Prism no reconoce automáticamente
   */
  private processAlfTypes(html: string): string {
    const definitions = this.typeDefinitions();
    const typePattern = /(\w+(?:Enum|Interface))/g;

    // Verificar si ya tiene tokens de tipo
    if (html.includes('alf-type')) return html;

    return html.replace(typePattern, (match, p1, offset, fullString) => {
      // Evitar procesar dentro de tags HTML ya generados por Prism
      const before = fullString.substring(Math.max(0, offset - 50), offset);
      if (before.includes('<span') && !before.includes('</span>')) {
        return match;
      }

      const hasDefinition = definitions && definitions[match];
      if (hasDefinition) {
        return `<span class="token alf-type alf-type-clickable" data-type="${match}" title="Click para ver definición">${match}</span>`;
      }
      return `<span class="token alf-type">${match}</span>`;
    });
  }


  /** Alternar entre código completo y truncado */
  protected toggleExpand = (): void => {
    this.isExpanded.update(v => !v);
  };

  /** Manejar clic en tipo - emite evento para navegación */
  protected onTypeClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('alf-type-clickable')) {
      event.stopPropagation();
      const typeName = target.dataset['type'];
      if (typeName) {
        this.typeClick.emit(typeName);
      }
    }
  };

  /** Copiar código al portapapeles */
  protected async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  }
}
