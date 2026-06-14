import re

template = """  // ------------------------------------------------
  // {UPPER}
  // ------------------------------------------------
  {Name}Ghost = 'var(--alf-{lower}-ghost, {base_rgba})',
  {Name}GhostFocus = 'var(--alf-{lower}-ghost-focus, {focus})',
  {Name}GhostDisabled = 'var(--alf-{lower}-ghost-disabled, {disabled})',
  {Name}GhostActive = 'var(--alf-{lower}-ghost-active, {active})',
  {Name}GhostHover = 'var(--alf-{lower}-ghost-hover, {hover_rgba})',

  {Name}GhostBG = 'var(--alf-{lower}-ghost, {base_rgba})',
  {Name}GhostFocusBG = 'var(--alf-{lower}-ghost-focus, {focus})',
  {Name}GhostDisabledBG = 'var(--alf-{lower}-ghost-disabled, {disabled})',
  {Name}GhostActiveBG = 'var(--alf-{lower}-ghost-active, {active})',
  {Name}GhostHoverBG = 'var(--alf-{lower}-ghost-hover, {hover_rgba})',

  {Name}GhostText = 'var(--alf-{lower}-ghost-text, {text_rgba})',
  {Name}GhostTextFocus = 'var(--alf-{lower}-ghost-text-focus, {text_hover})',
  {Name}GhostTextDisabled = 'var(--alf-{lower}-ghost-text-disabled, {disabled})',
  {Name}GhostTextActive = 'var(--alf-{lower}-ghost-text-active, {text_active})',
  {Name}GhostTextHover = 'var(--alf-{lower}-ghost-text-hover, {text_hover})',

  {Name}GhostBorder = 'var(--alf-{lower}-ghost-border, {base_rgba})',
  {Name}GhostBorderHover = 'var(--alf-{lower}-ghost-border-hover, {hover_rgba})',
  {Name}GhostBorderFocus = 'var(--alf-{lower}-ghost-border-focus, {focus})',
  {Name}GhostBorderDisabled = 'var(--alf-{lower}-ghost-border-disabled, {disabled})',
  {Name}GhostBorderActive = 'var(--alf-{lower}-ghost-border-active, {active})',
"""

data = [
    ("Secondary", "rgba(108, 117, 125, 0.20)", "rgba(108, 117, 125, 0.30)", "#75879780", "#d5d8da", "#5d6e7e80", "#758797ff", "#5d6e7eff"),
    ("Success", "rgba(25, 135, 84, 0.20)", "rgba(25, 135, 84, 0.30)", "#57a88280", "#cae3d6", "#43926c80", "#57a882ff", "#43926cff"),
    ("Danger", "rgba(220, 53, 69, 0.20)", "rgba(220, 53, 69, 0.30)", "#e2586780", "#f5ced2", "#cb3f4e80", "#e25867ff", "#cb3f4eff"),
    ("Warning", "rgba(255, 193, 7, 0.20)", "rgba(255, 193, 7, 0.30)", "#d99e1680", "#fcedba", "#b7820f80", "#d99e16ff", "#b7820fff"),
    ("Info", "rgba(13, 202, 240, 0.20)", "rgba(13, 202, 240, 0.30)", "#35acc780", "#c3f2fa", "#2293ad80", "#35acc7ff", "#2293adff"),
    ("Light", "rgba(206, 212, 218, 0.25)", "rgba(206, 212, 218, 0.5)", "#21252980", "#f4f5f6", "#21252980", "#212529", "#212529"),
    ("Dark", "rgba(33, 37, 41, 0.08)", "rgba(33, 37, 41, 0.12)", "#49505780", "#c0c2c4", "#343a4080", "#495057", "#343a40")
]

output = ""
for name, base, hover, focus, disabled, active, text_hover, text_active in data:
    text_rgba = base.replace("0.20)", "0.30)").replace("0.25)", "0.30)").replace("0.08)", "0.30)")
    output += template.format(
        UPPER=name.upper(),
        Name=name,
        lower=name.lower(),
        base_rgba=base,
        hover_rgba=hover,
        focus=focus,
        disabled=disabled,
        active=active,
        text_rgba=text_rgba,
        text_hover=text_hover,
        text_active=text_active
    ) + "\n"

with open('scratchpad_ghost_out.ts', 'w') as f:
    f.write(output)

print("Generated!")
