const softColors = {
  Primary: { base: '#eff6ff', border: '#dbeafe', borderHover: '#bfdbfe', hover: '#eaf3fe', text: '#5a9bfdff', textHover: '#4085efff', focus: '#4085ef40', disabled: '#c6d8f5', active: '#2d6fd440' },
  Secondary: { base: '#f8f9fa', border: '#e9ecef', borderHover: '#dee2e6', hover: '#f4f5f7', text: '#8fa0b0ff', textHover: '#758797ff', focus: '#75879740', disabled: '#d5d8da', active: '#5d6e7e40' },
  Success: { base: '#f0fdf4', border: '#dcfce7', borderHover: '#bbf7d0', hover: '#ebfcf0', text: '#6cbd97ff', textHover: '#57a882ff', focus: '#57a88240', disabled: '#cae3d6', active: '#43926c40' },
  Danger: { base: '#fef2f2', border: '#fee2e2', borderHover: '#fecaca', hover: '#feeeee', text: '#f67280ff', textHover: '#e25867ff', focus: '#e2586740', disabled: '#f5ced2', active: '#cb3f4e40' },
  Warning: { base: '#fffbeb', border: '#fef3c7', borderHover: '#fde68a', hover: '#fef9e2', text: '#f0b429ff', textHover: '#d99e16ff', focus: '#d99e1640', disabled: '#fcedba', active: '#b7820f40' },
  Info: { base: '#ecfeff', border: '#cffafe', borderHover: '#a5f3fc', hover: '#e4fdfe', text: '#4ec3deff', textHover: '#35acc7ff', focus: '#35acc740', disabled: '#c3f2fa', active: '#2293ad40' },
  Light: { base: '#f8f9fa', border: '#e9ecef', borderHover: '#dee2e6', hover: '#f4f5f7', text: '#212529', textHover: '#212529', focus: '#21252940', disabled: '#f4f5f6', active: '#21252940' },
  Dark: { base: '#e9ecef', border: '#dee2e6', borderHover: '#ced4da', hover: '#e6e9ec', text: '#6c757d', textHover: '#495057', focus: '#49505740', disabled: '#c0c2c4', active: '#343a4040' }
};

let output = '  // ===== SOFT MODALITY =====\n';

for (const [name, colors] of Object.entries(softColors)) {
  const lower = name.toLowerCase();
  output += `  ${name}Soft = 'var(--alf-${lower}-soft, ${colors.base})',\n`;
  output += `  ${name}SoftFocus = 'var(--alf-${lower}-soft-focus, ${colors.focus})',\n`;
  output += `  ${name}SoftDisabled = 'var(--alf-${lower}-soft-disabled, ${colors.disabled})',\n`;
  output += `  ${name}SoftActive = 'var(--alf-${lower}-soft-active, ${colors.active})',\n`;
  output += `  ${name}SoftHover = 'var(--alf-${lower}-soft-hover, ${colors.hover})',\n\n`;

  output += `  ${name}SoftBG = 'var(--alf-${lower}-soft-bg, ${colors.base})',\n`;
  output += `  ${name}SoftFocusBG = 'var(--alf-${lower}-soft-focus-bg, ${colors.focus})',\n`;
  output += `  ${name}SoftDisabledBG = 'var(--alf-${lower}-soft-disabled-bg, ${colors.disabled})',\n`;
  output += `  ${name}SoftActiveBG = 'var(--alf-${lower}-soft-active-bg, ${colors.active})',\n`;
  output += `  ${name}SoftHoverBG = 'var(--alf-${lower}-soft-hover-bg, ${colors.hover})',\n\n`;

  output += `  ${name}SoftText = 'var(--alf-${lower}-soft-text, ${colors.text})',\n`;
  output += `  ${name}SoftTextFocus = 'var(--alf-${lower}-soft-text-focus, ${colors.focus})',\n`;
  output += `  ${name}SoftTextDisabled = 'var(--alf-${lower}-soft-text-disabled, ${colors.disabled})',\n`;
  output += `  ${name}SoftTextActive = 'var(--alf-${lower}-soft-text-active, ${colors.active})',\n`;
  output += `  ${name}SoftTextHover = 'var(--alf-${lower}-soft-text-hover, ${colors.textHover})',\n\n`;

  output += `  ${name}SoftBorder = 'var(--alf-${lower}-soft-border, ${colors.border})',\n`;
  output += `  ${name}SoftBorderHover = 'var(--alf-${lower}-soft-border-hover, ${colors.borderHover})',\n`;
  output += `  ${name}SoftBorderFocus = 'var(--alf-${lower}-soft-border-focus, ${colors.focus})',\n`;
  output += `  ${name}SoftBorderDisabled = 'var(--alf-${lower}-soft-border-disabled, ${colors.disabled})',\n`;
  output += `  ${name}SoftBorderActive = 'var(--alf-${lower}-soft-border-active, ${colors.active})',\n\n`;
}

console.log(output);
