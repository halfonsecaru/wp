import '@angular/compiler';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/**
 * ARCHIVO DE CONFIGURACIÓN DE TESTING DE ANGUAR (VITEST)
 * Este archivo se carga antes de cada test para inicializar el entorno.
 */

// Log de depuración para verificar la carga
console.log('🧪 vitest.setup.ts: Initializing Angular testing environment...');

// Resetear cualquier entorno previo por si acaso
const testBed = getTestBed();
if (testBed.platform) {
  console.log('⚠️ TestBed already initialized, resetting...');
  testBed.resetTestEnvironment();
}

// Inicializar el entorno de testing de Angular
testBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: false }
  }
);

// Mock globales para JSDOM
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

console.log('✅ Angular testing environment initialized successfully');
