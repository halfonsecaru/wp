import {
  AlfBackgroundsBaseInterface,
  AlfBorderBaseInterface,
  AlfMarginBaseInterface,
  AlfPaddingBaseInterface,
  AlfShadowsBaseInterface,
  AlfTransformBaseInterface,
  AlfTypographyBaseInterface,
} from '../interfaces';

// ============================================================
// TIPOS INTERNOS
// ============================================================

type CssVarMap = Record<string, string>;

// ============================================================
// HELPER PRIVADO: kebab-case
// ============================================================

const toKebab = (str: string): string =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Escribe una var CSS solo si tiene valor.
 */
const writeVar = (vars: CssVarMap, name: string, value: unknown): void => {
  if (value !== undefined && value !== null) {
    vars[name] = String(value);
  }
};

/**
 * Escribe una var CSS solo si NOT está ya definida (para no pisar un individual explícito).
 */
const writeVarIfAbsent = (vars: CssVarMap, name: string, value: unknown): void => {
  if (value !== undefined && value !== null && !(name in vars)) {
    vars[name] = String(value);
  }
};

// ============================================================
// RESOLVERS POR CATEGORÍA
// ============================================================

/**
 * Resuelve las CSS vars de Padding.
 * Expande el shorthand `padding` en las 4 direcciones si no están definidas individualmente.
 *
 * @example
 * Input:  { padding: '1rem' }
 * Output: { '--alf-pad-padding': '1rem', '--alf-pad-padding-top': '1rem', ... }
 *
 * @example
 * Input:  { padding: '1rem', paddingTop: '2rem' }
 * Output: { '--alf-pad-padding': '1rem', '--alf-pad-padding-top': '2rem',
 *           '--alf-pad-padding-right': '1rem', '--alf-pad-padding-bottom': '1rem',
 *           '--alf-pad-padding-left': '1rem' }
 */
export const resolvePaddingVars = (data: AlfPaddingBaseInterface, stateSuffix: string): CssVarMap => {
  const vars: CssVarMap = {};
  const s = stateSuffix;

  // 1. Individuales primero (tienen prioridad sobre el shorthand)
  writeVar(vars, `--alf-pad-padding-top${s}`,    data.paddingTop);
  writeVar(vars, `--alf-pad-padding-right${s}`,  data.paddingRight);
  writeVar(vars, `--alf-pad-padding-bottom${s}`, data.paddingBottom);
  writeVar(vars, `--alf-pad-padding-left${s}`,   data.paddingLeft);

  // 2. Shorthand: se escribe la var genérica Y se rellena lo que falte
  if (data.padding !== undefined && data.padding !== null) {
    writeVar(vars, `--alf-pad-padding${s}`, data.padding);
    writeVarIfAbsent(vars, `--alf-pad-padding-top${s}`,    data.padding);
    writeVarIfAbsent(vars, `--alf-pad-padding-right${s}`,  data.padding);
    writeVarIfAbsent(vars, `--alf-pad-padding-bottom${s}`, data.padding);
    writeVarIfAbsent(vars, `--alf-pad-padding-left${s}`,   data.padding);
  }

  return vars;
};

/**
 * Resuelve las CSS vars de Margin.
 * Expande el shorthand `margin` en las 4 direcciones si no están definidas individualmente.
 */
export const resolveMarginVars = (data: AlfMarginBaseInterface, stateSuffix: string): CssVarMap => {
  const vars: CssVarMap = {};
  const s = stateSuffix;

  // 1. Individuales primero
  writeVar(vars, `--alf-mar-margin-top${s}`,    data.marginTop);
  writeVar(vars, `--alf-mar-margin-right${s}`,  data.marginRight);
  writeVar(vars, `--alf-mar-margin-bottom${s}`, data.marginBottom);
  writeVar(vars, `--alf-mar-margin-left${s}`,   data.marginLeft);

  // 2. Shorthand
  if (data.margin !== undefined && data.margin !== null) {
    writeVar(vars, `--alf-mar-margin${s}`, data.margin);
    writeVarIfAbsent(vars, `--alf-mar-margin-top${s}`,    data.margin);
    writeVarIfAbsent(vars, `--alf-mar-margin-right${s}`,  data.margin);
    writeVarIfAbsent(vars, `--alf-mar-margin-bottom${s}`, data.margin);
    writeVarIfAbsent(vars, `--alf-mar-margin-left${s}`,   data.margin);
  }

  return vars;
};

/**
 * Resuelve las CSS vars de Border.
 * Expande los shorthands:
 * - `borderWidth`  → top/right/bottom/left
 * - `borderStyle`  → top/right/bottom/left
 * - `borderColor`  → top/right/bottom/left
 * - `borderRadius` → top-left/top-right/bottom-right/bottom-left
 */
export const resolveBorderVars = (data: AlfBorderBaseInterface, stateSuffix: string): CssVarMap => {
  const vars: CssVarMap = {};
  const s = stateSuffix;

  // --- BORDER WIDTH ---
  writeVar(vars, `--alf-brd-border-top-width${s}`,    data.borderTopWidth);
  writeVar(vars, `--alf-brd-border-right-width${s}`,  data.borderRightWidth);
  writeVar(vars, `--alf-brd-border-bottom-width${s}`, data.borderBottomWidth);
  writeVar(vars, `--alf-brd-border-left-width${s}`,   data.borderLeftWidth);
  if (data.borderWidth !== undefined && data.borderWidth !== null) {
    writeVar(vars, `--alf-brd-width${s}`, data.borderWidth);
    writeVarIfAbsent(vars, `--alf-brd-border-top-width${s}`,    data.borderWidth);
    writeVarIfAbsent(vars, `--alf-brd-border-right-width${s}`,  data.borderWidth);
    writeVarIfAbsent(vars, `--alf-brd-border-bottom-width${s}`, data.borderWidth);
    writeVarIfAbsent(vars, `--alf-brd-border-left-width${s}`,   data.borderWidth);
  }

  // --- BORDER STYLE ---
  writeVar(vars, `--alf-brd-border-top-style${s}`,    data.borderTopStyle);
  writeVar(vars, `--alf-brd-border-right-style${s}`,  data.borderRightStyle);
  writeVar(vars, `--alf-brd-border-bottom-style${s}`, data.borderBottomStyle);
  writeVar(vars, `--alf-brd-border-left-style${s}`,   data.borderLeftStyle);
  if (data.borderStyle !== undefined && data.borderStyle !== null) {
    writeVar(vars, `--alf-brd-style${s}`, data.borderStyle);
    writeVarIfAbsent(vars, `--alf-brd-border-top-style${s}`,    data.borderStyle);
    writeVarIfAbsent(vars, `--alf-brd-border-right-style${s}`,  data.borderStyle);
    writeVarIfAbsent(vars, `--alf-brd-border-bottom-style${s}`, data.borderStyle);
    writeVarIfAbsent(vars, `--alf-brd-border-left-style${s}`,   data.borderStyle);
  }

  // --- BORDER COLOR ---
  writeVar(vars, `--alf-brd-border-top-color${s}`,    data.borderTopColor);
  writeVar(vars, `--alf-brd-border-right-color${s}`,  data.borderRightColor);
  writeVar(vars, `--alf-brd-border-bottom-color${s}`, data.borderBottomColor);
  writeVar(vars, `--alf-brd-border-left-color${s}`,   data.borderLeftColor);
  if (data.borderColor !== undefined && data.borderColor !== null) {
    writeVar(vars, `--alf-brd-color${s}`, data.borderColor);
    writeVarIfAbsent(vars, `--alf-brd-border-top-color${s}`,    data.borderColor);
    writeVarIfAbsent(vars, `--alf-brd-border-right-color${s}`,  data.borderColor);
    writeVarIfAbsent(vars, `--alf-brd-border-bottom-color${s}`, data.borderColor);
    writeVarIfAbsent(vars, `--alf-brd-border-left-color${s}`,   data.borderColor);
  }

  // --- BORDER RADIUS ---
  writeVar(vars, `--alf-brd-border-top-left-radius${s}`,     data.borderTopLeftRadius);
  writeVar(vars, `--alf-brd-border-top-right-radius${s}`,    data.borderTopRightRadius);
  writeVar(vars, `--alf-brd-border-bottom-right-radius${s}`, data.borderBottomRightRadius);
  writeVar(vars, `--alf-brd-border-bottom-left-radius${s}`,  data.borderBottomLeftRadius);
  if (data.borderRadius !== undefined && data.borderRadius !== null) {
    writeVar(vars, `--alf-brd-radius${s}`, data.borderRadius);
    writeVarIfAbsent(vars, `--alf-brd-border-top-left-radius${s}`,     data.borderRadius);
    writeVarIfAbsent(vars, `--alf-brd-border-top-right-radius${s}`,    data.borderRadius);
    writeVarIfAbsent(vars, `--alf-brd-border-bottom-right-radius${s}`, data.borderRadius);
    writeVarIfAbsent(vars, `--alf-brd-border-bottom-left-radius${s}`,  data.borderRadius);
  }

  // --- OUTLINE (no tiene shorthand, son propiedades individuales) ---
  writeVar(vars, `--alf-brd-outline-width${s}`,  data.outlineWidth);
  writeVar(vars, `--alf-brd-outline-style${s}`,  data.outlineStyle);
  writeVar(vars, `--alf-brd-outline-color${s}`,  data.outlineColor);
  writeVar(vars, `--alf-brd-outline-offset${s}`, data.outlineOffset);

  // --- BOX SIZING ---
  writeVar(vars, `--alf-brd-box-sizing${s}`, data.boxSizing);

  return vars;
};

/**
 * Resuelve las CSS vars de Backgrounds.
 * No tiene shorthands — cada propiedad es ya individual.
 */
export const resolveBackgroundsVars = (data: AlfBackgroundsBaseInterface, stateSuffix: string): CssVarMap => {
  const vars: CssVarMap = {};
  const s = stateSuffix;

  writeVar(vars, `--alf-bg-color${s}`,       data.backgroundColor);
  writeVar(vars, `--alf-bg-size${s}`,        data.backgroundSize);
  writeVar(vars, `--alf-bg-pos${s}`,         data.backgroundPosition);
  writeVar(vars, `--alf-bg-repeat${s}`,      data.backgroundRepeat);
  writeVar(vars, `--alf-bg-attachment${s}`,  data.backgroundAttachment);
  writeVar(vars, `--alf-bg-clip${s}`,        data.backgroundClip);
  writeVar(vars, `--alf-bg-img${s}`,         data.backgroundImage);

  // Soporte para estilos custom inyectados como variables (ej. background-image para degradados)
  if (data.customCssStyle) {
    data.customCssStyle.forEach(style => {
      Object.entries(style).forEach(([prop, value]) => {
        writeVar(vars, `--alf-bg-custom-${toKebab(prop)}${s}`, value);
      });
    });
  }

  return vars;
};

/**
 * Resuelve las CSS vars de Shadows.
 */
export const resolveShadowsVars = (data: AlfShadowsBaseInterface, stateSuffix: string): CssVarMap => {
  const vars: CssVarMap = {};
  const s = stateSuffix;

  writeVar(vars, `--alf-shd-val${s}`,          data.boxShadow);
  writeVar(vars, `--alf-shd-color${s}`,        data.boxShadowColor);
  writeVar(vars, `--alf-shd-inset${s}`,        data.boxShadowInset);
  writeVar(vars, `--alf-shd-text${s}`,         data.textShadow);
  writeVar(vars, `--alf-shd-text-color${s}`,   data.textShadowColor);

  return vars;
};

/**
 * Resuelve las CSS vars de Transform.
 */
export const resolveTransformVars = (data: AlfTransformBaseInterface, stateSuffix: string): CssVarMap => {
  const vars: CssVarMap = {};
  const s = stateSuffix;

  // Itera dinámicamente sobre las propiedades del transform
  Object.entries(data).forEach(([prop, value]) => {
    if (prop === 'customCssClass' || prop === 'customCssStyle') return;
    writeVar(vars, `--alf-trf-${toKebab(prop)}${s}`, value);
  });

  return vars;
};

/**
 * Resuelve las CSS vars de Typography.
 */
export const resolveTypographyVars = (data: AlfTypographyBaseInterface, stateSuffix: string): CssVarMap => {
  const vars: CssVarMap = {};
  const s = stateSuffix;

  // Mapa explícito: propiedad de la interface → sufijo de la CSS var
  const propMap: Record<string, string> = {
    color:          'color',
    fontSize:       'size',
    fontWeight:     'weight',
    fontFamily:     'family',
    fontStyle:      'style',
    lineHeight:     'line-height',
    letterSpacing:  'letter-spacing',
    textAlign:      'align',
    textDecoration: 'decoration',
    textTransform:  'transform',
    whiteSpace:     'white-space',
    wordBreak:      'word-break',
    overflowWrap:   'overflow-wrap',
    verticalAlign:  'vertical-align',
    textOverflow:   'overflow',
    textShadow:     'shadow',
    opacity:        'opacity',
  };

  Object.entries(data).forEach(([prop, value]) => {
    if (prop === 'customCssClass' || prop === 'customCssStyle') return;
    const cleanProp = propMap[prop] ?? toKebab(prop);
    writeVar(vars, `--alf-txt-${cleanProp}${s}`, value);
  });

  return vars;
};

// ============================================================
// RESOLVER GLOBAL — Punto de entrada para el Engine
// ============================================================

type AlfState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';

/**
 * Resuelve TODAS las CSS vars para una categoría + estado dados.
 * Punto de entrada único que reemplaza el loop genérico del Engine.
 */
export const resolveStyleVarsForCategory = (
  key: 'backgrounds' | 'border' | 'margin' | 'padding' | 'shadows' | 'transform' | 'typography',
  stateData: unknown,
  state: AlfState,
): CssVarMap => {
  const stateSuffix: string = state === 'default' ? '' : `-${state}`;

  switch (key) {
    case 'padding':     return resolvePaddingVars(stateData as AlfPaddingBaseInterface, stateSuffix);
    case 'margin':      return resolveMarginVars(stateData as AlfMarginBaseInterface, stateSuffix);
    case 'border':      return resolveBorderVars(stateData as AlfBorderBaseInterface, stateSuffix);
    case 'backgrounds': return resolveBackgroundsVars(stateData as AlfBackgroundsBaseInterface, stateSuffix);
    case 'shadows':     return resolveShadowsVars(stateData as AlfShadowsBaseInterface, stateSuffix);
    case 'transform':   return resolveTransformVars(stateData as AlfTransformBaseInterface, stateSuffix);
    case 'typography':  return resolveTypographyVars(stateData as AlfTypographyBaseInterface, stateSuffix);
    default:            return {};
  }
};
