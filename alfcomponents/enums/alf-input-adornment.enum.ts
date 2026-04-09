/**
 * Enum para adornos de input (prefijos y sufijos)
 * Símbolos comunes usados como decoración en inputs
 * 
 * @example
 * ```typescript
 * // Como prefijo (icon)
 * { icon: AlfInputAdornmentEnum.Dollar }  // $ antes del input
 * 
 * // Como sufijo
 * { suffix: AlfInputAdornmentEnum.Percent }  // % después del input
 * ```
 */
export enum AlfInputAdornmentEnum {
  // ===== MONEDAS =====
  /** Símbolo de dólar ($) */
  Dollar = '$',
  /** Símbolo de euro (€) */
  Euro = '€',
  /** Símbolo de libra (£) */
  Pound = '£',
  /** Símbolo de yen (¥) */
  Yen = '¥',
  /** Símbolo de bitcoin (₿) */
  Bitcoin = '₿',

  // ===== MATEMÁTICOS/PORCENTAJES =====
  /** Símbolo de porcentaje (%) */
  Percent = '%',
  /** Símbolo de más (+) */
  Plus = '+',
  /** Símbolo de menos (-) */
  Minus = '-',
  /** Símbolo de multiplicación (×) */
  Multiply = '×',
  /** Símbolo de división (÷) */
  Divide = '÷',
  /** Símbolo de igual (=) */
  Equals = '=',

  // ===== SÍMBOLOS COMUNES =====
  /** Arroba (@) - para emails, usuarios */
  At = '@',
  /** Almohadilla (#) - para tags, números */
  Hash = '#',
  /** Ampersand (&) */
  Ampersand = '&',
  /** Asterisco (*) */
  Asterisk = '*',
  /** Barra diagonal (/) */
  Slash = '/',
  /** Barra invertida (\) */
  Backslash = '\\',
  /** Punto (.) */
  Dot = '.',
  /** Coma (,) */
  Comma = ',',
  /** Dos puntos (:) */
  Colon = ':',
  /** Punto y coma (;) */
  Semicolon = ';',

  // ===== UNIDADES =====
  /** Kilogramos (kg) */
  Kg = 'kg',
  /** Gramos (g) */
  G = 'g',
  /** Libras (lb) */
  Lb = 'lb',
  /** Metros (m) */
  M = 'm',
  /** Centímetros (cm) */
  Cm = 'cm',
  /** Kilómetros (km) */
  Km = 'km',
  /** Millas (mi) */
  Mi = 'mi',
  /** Litros (L) */
  L = 'L',
  /** Mililitros (mL) */
  ML = 'mL',
  /** Horas (h) */
  H = 'h',
  /** Minutos (min) */
  Min = 'min',
  /** Segundos (s) */
  S = 's',
  /** Grados Celsius (°C) */
  Celsius = '°C',
  /** Grados Fahrenheit (°F) */
  Fahrenheit = '°F',

  // ===== TEXTO COMÚN =====
  /** Prefijo HTTP */
  Http = 'http://',
  /** Prefijo HTTPS */
  Https = 'https://',
  /** Prefijo WWW */
  Www = 'www.',
  /** Dominio .com */
  DotCom = '.com',
  /** Dominio .es */
  DotEs = '.es',
  /** Dominio .org */
  DotOrg = '.org',
}
