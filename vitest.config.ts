import { defineConfig } from 'vitest/config';
import path from 'path';
import angular from '@analogjs/vite-plugin-angular';

/**
 * CONFIGURACIÓN DE VITEST (VERSION ÉLITE OPTIMIZADA)
 * Re-habilitamos el plugin de Analog de forma minimalista para resolver Resources (html/scss)
 * sin ensuciar el código fuente.
 */

export default defineConfig({
  plugins: [
    angular({
      jit: true,
      tsconfig: './tsconfig.spec.json',
      include: ['alfcomponents/**/*.ts', 'apps/**/*.ts', 'libs/**/*.ts', 'vitest.setup.ts'],
    })
  ],
  resolve: {
    alias: {
      '@alfcomponents': path.resolve(__dirname, './alfcomponents'),
      '@libs/shared': path.resolve(__dirname, './libs/shared'),
      '@libs/angular': path.resolve(__dirname, './libs/angular'),
      '@libs/nestjs': path.resolve(__dirname, './libs/nestjs'),
      '@libs/examples': path.resolve(__dirname, './libs/examples'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // Escaneo de carpetas principales
    include: [
      'alfcomponents/**/*.spec.ts',
      'apps/**/*.spec.ts',
      'libs/**/*.spec.ts'
    ],
    exclude: ['node_modules', 'dist', '.angular', '.gemini'],
    deps: {
      inline: ['@angular/compiler', '@angular/core', '@angular/common', '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/core/testing']
    },
    server: {
      deps: {
        inline: ['@angular/compiler', '@angular/core', '@angular/common', '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/core/testing']
      }
    }
  },
});
