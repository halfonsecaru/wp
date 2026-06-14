template = """  // ------------------------------------------------
  // {UPPER}
  // ------------------------------------------------
  {Name} = 'var(--alf-{lower}, {base})',
  {Name}Focus = 'var(--alf-{lower}-focus, {focus})',
  {Name}Disabled = 'var(--alf-{lower}-disabled, {disabled})',
  {Name}Active = 'var(--alf-{lower}-active, {active})',
  {Name}Hover = 'var(--alf-{lower}-hover, {hover})',

  {Name}BG = 'var(--alf-{lower}, {base})',
  {Name}FocusBG = 'var(--alf-{lower}-focus, {focus})',
  {Name}DisabledBG = 'var(--alf-{lower}-disabled, {disabled})',
  {Name}ActiveBG = 'var(--alf-{lower}-active, {active})',
  {Name}HoverBG = 'var(--alf-{lower}-hover, {hover})',

  {Name}Text = 'var(--alf-{lower}-text, {text_base})',
  {Name}TextFocus = 'var(--alf-{lower}-text-focus, {text_focus})',
  {Name}TextDisabled = 'var(--alf-{lower}-text-disabled, {text_disabled})',
  {Name}TextActive = 'var(--alf-{lower}-text-active, {text_active})',
  {Name}TextHover = 'var(--alf-{lower}-text-hover, {text_hover})',

  {Name}Border = 'var(--alf-{lower}-border, {border_base})',
  {Name}BorderHover = 'var(--alf-{lower}-border-hover, {border_hover})',
  {Name}BorderFocus = 'var(--alf-{lower}-border-focus, {border_focus})',
  {Name}BorderDisabled = 'var(--alf-{lower}-border-disabled, {border_disabled})',
  {Name}BorderActive = 'var(--alf-{lower}-border-active, {border_active})',
"""

data = [
    ("Primary", "#0d6efd", "#0a55c7ff", "#0a55c7ff", "#a0b6d7ff", "#0a55c7ff", "#ffffffff", "#ffffffff", "#ffffffff", "#ffffffff", "#ffffffff"),
    ("Secondary", "#6c757d", "#4a5055ff", "#4a5055ff", "#aab1b6", "#4a5055ff", "#ffffffff", "#ffffffff", "#ffffffa6", "#ffffffff", "#ffffffff"),
    ("Success", "#198754", "#125b39ff", "#125b39ff", "#8cc5a6", "#125b39ff", "#ffffffff", "#ffffffff", "#ffffffa6", "#ffffffff", "#ffffffff"),
    ("Danger", "#dc3545", "#bb2d3b", "#bb2d3b", "#efa0a8", "#bb2d3b", "#ffffffff", "#ffffffff", "#ffffffa6", "#ffffffff", "#ffffffff"),
    ("Warning", "#ffc107", "#d39e00", "#d39e00", "#fcedba", "#d39e00", "#000000ff", "#000000ff", "#000000a6", "#000000ff", "#000000ff"),
    ("Info", "#0dcaf0", "#0aa2c0", "#0aa2c0", "#9eeaf9", "#0aa2c0", "#000000ff", "#000000ff", "#000000a6", "#000000ff", "#000000ff"),
    ("Light", "#f8f9fa", "#e2e6ea", "#e2e6ea", "#f8f9fa", "#e2e6ea", "#000000ff", "#000000ff", "#000000a6", "#000000ff", "#000000ff"),
    ("Dark", "#212529", "#1d2124", "#1d2124", "#8c9298", "#1d2124", "#ffffffff", "#ffffffff", "#ffffffa6", "#ffffffff", "#ffffffff")
]

output = ""
for name, base, hover, focus, disabled, active, text_base, text_hover, text_disabled, text_active, text_focus in data:
    output += template.format(
        UPPER=name.upper(),
        Name=name,
        lower=name.lower(),
        base=base,
        hover=hover,
        focus=focus,
        disabled=disabled,
        active=active,
        text_base=text_base,
        text_hover=text_hover,
        text_focus=text_focus,
        text_disabled=text_disabled,
        text_active=text_active,
        border_base=base,
        border_hover=hover,
        border_focus=focus,
        border_disabled=disabled,
        border_active=active
    ) + "\n"

with open('scratchpad_solid_out.ts', 'w') as f:
    f.write(output)

print("Generated!")
