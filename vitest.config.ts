import { defineConfig } from 'vitest/config';
import path from 'path';

/**
 * CONFIGURACIÓN DE VITEST (VERSION SUPER-LIGERA SIN ANALOG)
 * Al usar componentes Inline, no necesitamos el plugin pesado que daba errores.
 */

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // Escaneo de carpetas principales
    include: [
      'alfcomponents/**/*.spec.ts',
      'projects/**/*.spec.ts'
    ],
    exclude: ['node_modules', 'dist', '.angular', '.gemini'],
    css: true,
    server: {
      deps: {
        inline: ['@angular/core', '@angular/common', '@angular/platform-browser', '@angular/platform-browser-dynamic']
      }
    }
  },
});
