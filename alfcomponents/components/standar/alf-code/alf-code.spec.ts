import { ComponentFixture, TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { vi } from 'vitest';

import { AlfCodeComponent } from './alf-code';

// Mock Prism.js
const mockPrism = {
  highlightElement: vi.fn(),
  highlightAll: vi.fn()
};

// Asignar mock global
(window as any).Prism = mockPrism;

// Initialize Angular TestBed
const testBed = getTestBed();
if (!testBed.platform) {
  testBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
    { teardown: { destroyAfterEach: false } }
  );
}

describe('AlfCodeComponent', () => {
  let component: AlfCodeComponent;
  let fixture: ComponentFixture<AlfCodeComponent>;

  const sampleCode = `const greeting = 'Hello World';
console.log(greeting);`;

  const multiLineCode = `line 1
line 2
line 3
line 4
line 5
line 6
line 7
line 8
line 9
line 10`;

  beforeEach(async () => {
    // Reset Prism mock before each test
    mockPrism.highlightElement.mockClear();
    mockPrism.highlightAll.mockClear();

    await TestBed.configureTestingModule({
      imports: [AlfCodeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlfCodeComponent);
    component = fixture.componentInstance;
  });

  // ========================================
  // CREACIÓN BÁSICA
  // ========================================

  describe('Basic Creation', () => {
    it('should create', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should render the code container', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.alf-code-container'));
      expect(container).toBeTruthy();
    });

    it('should render the code block', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const codeBlock = fixture.debugElement.query(By.css('.alf-code-block'));
      expect(codeBlock).toBeTruthy();
    });

    it('should render code element with correct class', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement).toBeTruthy();
      expect(codeElement.nativeElement.classList.contains('language-typescript')).toBe(true);
    });
  });

  // ========================================
  // INPUTS
  // ========================================

  describe('Inputs', () => {
    it('should display provided code', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.textContent).toContain("const greeting = 'Hello World'");
    });

    it('should apply correct language class', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.componentRef.setInput('language', 'javascript');
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.classList.contains('language-javascript')).toBe(true);
    });

    it('should default to typescript language', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.classList.contains('language-typescript')).toBe(true);
    });

    it('should support different languages', async () => {
      const languages = ['python', 'css', 'html', 'json', 'bash'];

      for (const lang of languages) {
        fixture.componentRef.setInput('code', sampleCode);
        fixture.componentRef.setInput('language', lang);
        fixture.detectChanges();
        await fixture.whenStable();

        const codeElement = fixture.debugElement.query(By.css('code'));
        expect(codeElement.nativeElement.classList.contains(`language-${lang}`)).toBe(true);
      }
    });
  });

  // ========================================
  // TÍTULO
  // ========================================

  describe('Title', () => {
    it('should display title when provided', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.componentRef.setInput('title', 'Example Code');
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(By.css('.alf-code-title'));
      expect(titleEl).toBeTruthy();
      expect(titleEl.nativeElement.textContent).toBe('Example Code');
    });

    it('should NOT display header when no title is provided', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const headerEl = fixture.debugElement.query(By.css('.alf-code-header'));
      expect(headerEl).toBeFalsy();
    });

    it('should display language badge in header', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.componentRef.setInput('title', 'Test');
      fixture.componentRef.setInput('language', 'python');
      fixture.detectChanges();

      const langBadge = fixture.debugElement.query(By.css('.alf-code-language'));
      expect(langBadge).toBeTruthy();
      expect(langBadge.nativeElement.textContent).toBe('python');
    });
  });

  // ========================================
  // BOTÓN DE COPIAR
  // ========================================

  describe('Copy Button', () => {
    it('should show copy button by default', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const copyBtn = fixture.debugElement.query(By.css('.alf-code-copy-btn'));
      expect(copyBtn).toBeTruthy();
    });

    it('should NOT show copy button when showCopyButton is false', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.componentRef.setInput('showCopyButton', false);
      fixture.detectChanges();

      const copyBtn = fixture.debugElement.query(By.css('.alf-code-copy-btn'));
      expect(copyBtn).toBeFalsy();
    });

    it('should display "Copy" text initially', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const copyText = fixture.debugElement.query(By.css('.copy-text'));
      expect(copyText.nativeElement.textContent).toBe('Copy');
    });

    it('should have correct aria-label initially', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const copyBtn = fixture.debugElement.query(By.css('.alf-code-copy-btn'));
      expect(copyBtn.nativeElement.getAttribute('aria-label')).toBe('Copiar código');
    });

    it('should call copyCode when clicking copy button', async () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      // Mock clipboard API
      const clipboardMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: clipboardMock
        }
      });

      const copyBtn = fixture.debugElement.query(By.css('.alf-code-copy-btn'));
      copyBtn.nativeElement.click();

      await fixture.whenStable();

      expect(clipboardMock).toHaveBeenCalledWith(sampleCode);
    });

    it('should have button type attribute', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const copyBtn = fixture.debugElement.query(By.css('.alf-code-copy-btn'));
      expect(copyBtn.nativeElement.getAttribute('type')).toBe('button');
    });
  });

  // ========================================
  // LINE NUMBERS
  // ========================================

  describe('Line Numbers', () => {
    it('should NOT add line-numbers class by default', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      const codeBlock = fixture.debugElement.query(By.css('.alf-code-block'));
      expect(codeBlock.nativeElement.classList.contains('line-numbers')).toBe(false);
    });

    it('should add line-numbers class when showLineNumbers is true', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.componentRef.setInput('showLineNumbers', true);
      fixture.detectChanges();

      const codeBlock = fixture.debugElement.query(By.css('.alf-code-block'));
      expect(codeBlock.nativeElement.classList.contains('line-numbers')).toBe(true);
    });
  });

  // ========================================
  // TRUNCATION (maxLines)
  // ========================================

  describe('Truncation', () => {
    it('should show full code when maxLines is 0 (default)', () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.textContent).toContain('line 10');
    });

    it('should truncate code when maxLines is set', () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 3);
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.textContent).toContain('line 1');
      expect(codeElement.nativeElement.textContent).toContain('line 2');
      expect(codeElement.nativeElement.textContent).toContain('line 3');
      expect(codeElement.nativeElement.textContent).not.toContain('line 4');
      expect(codeElement.nativeElement.textContent).toContain('// ...');
    });

    it('should NOT show expand button when code is shorter than maxLines', () => {
      fixture.componentRef.setInput('code', 'short code');
      fixture.componentRef.setInput('maxLines', 10);
      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('.alf-code-expand-btn'));
      expect(expandBtn).toBeFalsy();
    });

    it('should show expand button when code is longer than maxLines', () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 3);
      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('.alf-code-expand-btn'));
      expect(expandBtn).toBeTruthy();
    });

    it('should show "Ver más" text on expand button', () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 3);
      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('.alf-code-expand-btn'));
      expect(expandBtn.nativeElement.textContent).toContain('Ver más');
    });

    it('should add truncated class to code block when truncated', () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 3);
      fixture.detectChanges();

      const codeBlock = fixture.debugElement.query(By.css('.alf-code-block'));
      expect(codeBlock.nativeElement.classList.contains('truncated')).toBe(true);
    });
  });

  // ========================================
  // EXPAND/COLLAPSE
  // ========================================

  describe('Expand/Collapse', () => {
    it('should expand code when clicking expand button', async () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 3);
      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('.alf-code-expand-btn'));
      expandBtn.nativeElement.click();

      await fixture.whenStable();
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.textContent).toContain('line 10');
      expect(codeElement.nativeElement.textContent).not.toContain('// ...');
    });

    it('should change button text to "Ver menos" when expanded', async () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 3);
      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('.alf-code-expand-btn'));
      expandBtn.nativeElement.click();

      await fixture.whenStable();
      fixture.detectChanges();

      expect(expandBtn.nativeElement.textContent).toContain('Ver menos');
    });

    it('should collapse code when clicking button again', async () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 3);
      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('.alf-code-expand-btn'));

      // Expandir
      expandBtn.nativeElement.click();
      await fixture.whenStable();
      fixture.detectChanges();

      // Colapsar
      expandBtn.nativeElement.click();
      await fixture.whenStable();
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.textContent).not.toContain('line 10');
      expect(codeElement.nativeElement.textContent).toContain('// ...');
    });

    it('should have button type on expand button', () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 3);
      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('.alf-code-expand-btn'));
      expect(expandBtn.nativeElement.getAttribute('type')).toBe('button');
    });
  });

  // ========================================
  // SYNTAX HIGHLIGHTING (Prism integration)
  // ========================================

  describe('Syntax Highlighting', () => {
    it('should call Prism.highlightElement after view init', async () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.detectChanges();

      // Wait for setTimeout in applyHighlighting (100ms)
      await new Promise(resolve => setTimeout(resolve, 150));

      expect(mockPrism.highlightElement).toHaveBeenCalled();
    });

    it('should apply correct language class to code element for python', () => {
      fixture.componentRef.setInput('code', sampleCode);
      fixture.componentRef.setInput('language', 'python');
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.classList.contains('language-python')).toBe(true);
    });
  });

  // ========================================
  // EDGE CASES
  // ========================================

  describe('Edge Cases', () => {
    it('should handle empty code string', () => {
      fixture.componentRef.setInput('code', '');
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement).toBeTruthy();
      expect(codeElement.nativeElement.textContent).toBe('');
    });

    it('should handle code with special characters', () => {
      const codeWithSpecialChars = `const html = '<div class="test">&nbsp;</div>';`;
      fixture.componentRef.setInput('code', codeWithSpecialChars);
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.textContent).toContain('<div class="test">');
    });

    it('should handle very long lines', () => {
      const longLine = 'a'.repeat(500);
      fixture.componentRef.setInput('code', longLine);
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.textContent).toBe(longLine);
    });

    it('should handle code with tabs', () => {
      const codeWithTabs = `function test() {\n\treturn true;\n}`;
      fixture.componentRef.setInput('code', codeWithTabs);
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.textContent).toContain('\t');
    });

    it('should handle maxLines equal to code lines (no truncation)', () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 10); // Exactly 10 lines
      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('.alf-code-expand-btn'));
      expect(expandBtn).toBeFalsy();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement.nativeElement.textContent).toContain('line 10');
    });

    it('should handle maxLines greater than code lines', () => {
      fixture.componentRef.setInput('code', multiLineCode);
      fixture.componentRef.setInput('maxLines', 20); // More than 10 lines
      fixture.detectChanges();

      const expandBtn = fixture.debugElement.query(By.css('.alf-code-expand-btn'));
      expect(expandBtn).toBeFalsy();
    });

    it('should handle code with newlines at end', () => {
      const codeWithNewlines = 'line 1\nline 2\n\n';
      fixture.componentRef.setInput('code', codeWithNewlines);
      fixture.detectChanges();

      const codeElement = fixture.debugElement.query(By.css('code'));
      expect(codeElement).toBeTruthy();
    });
  });
});

// ========================================
// INTEGRATION WITH HOST COMPONENT
// ========================================

@Component({
  selector: 'test-host-default',
  standalone: true,
  imports: [AlfCodeComponent],
  template: `<alf-code [code]="'const x = 1;'"></alf-code>`
})
class TestHostDefaultComponent { }

@Component({
  selector: 'test-host-with-title',
  standalone: true,
  imports: [AlfCodeComponent],
  template: `<alf-code [code]="'const x = 1;'" [title]="'My Title'"></alf-code>`
})
class TestHostWithTitleComponent { }

@Component({
  selector: 'test-host-no-copy',
  standalone: true,
  imports: [AlfCodeComponent],
  template: `<alf-code [code]="'const x = 1;'" [showCopyButton]="false"></alf-code>`
})
class TestHostNoCopyComponent { }

@Component({
  selector: 'test-host-python',
  standalone: true,
  imports: [AlfCodeComponent],
  template: `<alf-code [code]="'print(1)'" [language]="'python'"></alf-code>`
})
class TestHostPythonComponent { }

describe('AlfCodeComponent - Host Integration', () => {

  it('should render code when used from parent component', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostDefaultComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostDefaultComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const codeElement = fixture.debugElement.query(By.css('code'));
    expect(codeElement.nativeElement.textContent).toBe('const x = 1;');
  });

  it('should render title when passed from parent', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostWithTitleComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostWithTitleComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const titleEl = fixture.debugElement.query(By.css('.alf-code-title'));
    expect(titleEl).toBeTruthy();
    expect(titleEl.nativeElement.textContent).toBe('My Title');
  });

  it('should respect showCopyButton=false from parent', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostNoCopyComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostNoCopyComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css('.alf-code-copy-btn'))).toBeFalsy();
  });

  it('should apply python language class from parent', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostPythonComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostPythonComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const codeElement = fixture.debugElement.query(By.css('code'));
    expect(codeElement.nativeElement.classList.contains('language-python')).toBe(true);
  });
});
