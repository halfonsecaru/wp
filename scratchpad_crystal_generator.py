template = """  // ------------------------------------------------
  // {UPPER}
  // ------------------------------------------------
  {Name}Crystal = 'var(--alf-{lower}-crystal, {base})',
  {Name}CrystalFocus = 'var(--alf-{lower}-crystal-focus, {focus})',
  {Name}CrystalDisabled = 'var(--alf-{lower}-crystal-disabled, {disabled})',
  {Name}CrystalActive = 'var(--alf-{lower}-crystal-active, {active})',
  {Name}CrystalHover = 'var(--alf-{lower}-crystal-hover, {hover})',

  {Name}CrystalBG = 'var(--alf-{lower}-crystal-bg, {base})',
  {Name}CrystalFocusBG = 'var(--alf-{lower}-crystal-focus-bg, {focus})',
  {Name}CrystalDisabledBG = 'var(--alf-{lower}-crystal-disabled-bg, {disabled})',
  {Name}CrystalActiveBG = 'var(--alf-{lower}-crystal-active-bg, {active})',
  {Name}CrystalHoverBG = 'var(--alf-{lower}-crystal-hover-bg, {hover})',

  {Name}CrystalText = 'var(--alf-{lower}-crystal-text, {text_base})',
  {Name}CrystalTextFocus = 'var(--alf-{lower}-crystal-text-focus, {text_hover})',
  {Name}CrystalTextDisabled = 'var(--alf-{lower}-crystal-text-disabled, {disabled})',
  {Name}CrystalTextActive = 'var(--alf-{lower}-crystal-text-active, {active})',
  {Name}CrystalTextHover = 'var(--alf-{lower}-crystal-text-hover, {text_hover})',

  {Name}CrystalBorder = 'var(--alf-{lower}-crystal-border, {base})',
  {Name}CrystalBorderHover = 'var(--alf-{lower}-crystal-border-hover, {hover})',
  {Name}CrystalBorderFocus = 'var(--alf-{lower}-crystal-border-focus, {focus})',
  {Name}CrystalBorderDisabled = 'var(--alf-{lower}-crystal-border-disabled, {disabled})',
  {Name}CrystalBorderActive = 'var(--alf-{lower}-crystal-border-active, {active})',
"""

data = [
    ("Primary", "rgba(13, 110, 253, 0.15)", "rgba(13, 110, 253, 0.25)", "#5a9bfdff", "#4085efff", "#4085efff", "#c6d8f5", "#2d6fd4ff"),
    ("Secondary", "rgba(108, 117, 125, 0.15)", "rgba(108, 117, 125, 0.25)", "#8fa0b0ff", "#758797ff", "#758797ff", "#d5d8da", "#5d6e7eff"),
    ("Success", "rgba(25, 135, 84, 0.15)", "rgba(25, 135, 84, 0.25)", "#6cbd97ff", "#57a882ff", "#57a882ff", "#cae3d6", "#43926cff"),
    ("Danger", "rgba(220, 53, 69, 0.15)", "rgba(220, 53, 69, 0.25)", "#f67280ff", "#e25867ff", "#e25867ff", "#f5ced2", "#cb3f4eff"),
    ("Warning", "rgba(255, 193, 7, 0.15)", "rgba(255, 193, 7, 0.25)", "#f0b429ff", "#d99e16ff", "#d99e16ff", "#fcedba", "#b7820fff"),
    ("Info", "rgba(13, 202, 240, 0.15)", "rgba(13, 202, 240, 0.25)", "#4ec3deff", "#35acc7ff", "#35acc7ff", "#c3f2fa", "#2293adff"),
    ("Light", "rgba(206, 212, 218, 0.15)", "rgba(206, 212, 218, 0.25)", "#495057ff", "#212529ff", "#212529ff", "#f4f5f6", "#212529ff"),
    ("Dark", "rgba(33, 37, 41, 0.15)", "rgba(33, 37, 41, 0.25)", "#6c757dff", "#495057ff", "#495057ff", "#c0c2c4", "#343a40ff")
]

output = ""
for name, base, hover, text_base, text_hover, focus, disabled, active in data:
    output += template.format(
        UPPER=name.upper(),
        Name=name,
        lower=name.lower(),
        base=base,
        hover=hover,
        text_base=text_base,
        text_hover=text_hover,
        focus=focus,
        disabled=disabled,
        active=active
    ) + "\n"

with open('scratchpad_crystal_out.ts', 'w') as f:
    f.write(output)

print("Generated!")
