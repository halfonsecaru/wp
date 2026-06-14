template = """  // ------------------------------------------------
  // {UPPER}
  // ------------------------------------------------
  {Name}Outline = 'var(--alf-{lower}-outline, {base})',
  {Name}OutlineFocus = 'var(--alf-{lower}-outline-focus, {focus})',
  {Name}OutlineDisabled = 'var(--alf-{lower}-outline-disabled, {disabled})',
  {Name}OutlineActive = 'var(--alf-{lower}-outline-active, {active})',
  {Name}OutlineHover = 'var(--alf-{lower}-outline-hover, {hover})',

  {Name}OutlineBG = 'var(--alf-{lower}-outline-bg, transparent)',
  {Name}OutlineFocusBG = 'var(--alf-{lower}-outline-focus-bg, {bg_hover})',
  {Name}OutlineDisabledBG = 'var(--alf-{lower}-outline-disabled-bg, transparent)',
  {Name}OutlineActiveBG = 'var(--alf-{lower}-outline-active-bg, {bg_hover})',
  {Name}OutlineHoverBG = 'var(--alf-{lower}-outline-hover-bg, {bg_hover})',

  {Name}OutlineText = 'var(--alf-{lower}-outline-text, {base})',
  {Name}OutlineTextFocus = 'var(--alf-{lower}-outline-text-focus, {focus})',
  {Name}OutlineTextDisabled = 'var(--alf-{lower}-outline-text-disabled, {disabled})',
  {Name}OutlineTextActive = 'var(--alf-{lower}-outline-text-active, {active})',
  {Name}OutlineTextHover = 'var(--alf-{lower}-outline-text-hover, {hover})',

  {Name}OutlineBorder = 'var(--alf-{lower}-outline-border, {base})',
  {Name}OutlineBorderHover = 'var(--alf-{lower}-outline-border-hover, {hover})',
  {Name}OutlineBorderFocus = 'var(--alf-{lower}-outline-border-focus, {focus})',
  {Name}OutlineBorderDisabled = 'var(--alf-{lower}-outline-border-disabled, {disabled})',
  {Name}OutlineBorderActive = 'var(--alf-{lower}-outline-border-active, {active})',
"""

data = [
    ("Primary", "#0d6efd", "#0a55c7ff", "#0a55c7ff", "#9dbdf2", "#0a55c7ff", "rgba(13, 110, 253, 0.04)"),
    ("Secondary", "#6c757d", "#4a5055ff", "#4a5055ff", "#b1b6ba", "#4a5055ff", "rgba(108, 117, 125, 0.04)"),
    ("Success", "#198754", "#125b39ff", "#125b39ff", "#91c1aa", "#125b39ff", "rgba(25, 135, 84, 0.04)"),
    ("Danger", "#dc3545", "#bb2d3b", "#bb2d3b", "#f0a2ab", "#bb2d3b", "rgba(220, 53, 69, 0.04)"),
    ("Warning", "#ffc107", "#d39e00", "#d39e00", "#fcedba", "#d39e00", "rgba(255, 193, 7, 0.04)"),
    ("Info", "#0dcaf0", "#0aa2c0", "#0aa2c0", "#a1e5f4", "#0aa2c0", "rgba(13, 202, 240, 0.04)"),
    ("Light", "#f8f9fa", "#e2e6ea", "#e2e6ea", "#f8f9fa", "#e2e6ea", "rgba(248, 249, 250, 0.04)"),
    ("Dark", "#212529", "#1d2124", "#1d2124", "#92979c", "#1d2124", "rgba(33, 37, 41, 0.04)")
]

output = ""
for name, base, hover, focus, disabled, active, bg_hover in data:
    output += template.format(
        UPPER=name.upper(),
        Name=name,
        lower=name.lower(),
        base=base,
        hover=hover,
        focus=focus,
        disabled=disabled,
        active=active,
        bg_hover=bg_hover
    ) + "\n"

with open('scratchpad_outline_out.ts', 'w') as f:
    f.write(output)

print("Generated!")
