import re

def process(content):
    # Eliminate solid, depth, outline, soft, crystal, ghost definitions
    content = re.sub(r'/\*\*\n \* Variante Sólida estándar.*?\n\n', '', content, flags=re.DOTALL)
    content = re.sub(r'/\*\*\n \* Variante 3D / Profundidad.*?\n\n', '', content, flags=re.DOTALL)
    content = re.sub(r'/\*\*\n \* Variante Outline.*?\n\n\n', '', content, flags=re.DOTALL)
    content = re.sub(r'/\*\*\n \* Variante Soft.*?\n\n\n\n', '', content, flags=re.DOTALL)
    content = re.sub(r'/\*\*\n \* Variante Crystal.*?\n\n\n', '', content, flags=re.DOTALL)
    content = re.sub(r'/\*\*\n \* Variante Ghost.*?\n}\);\n\n', '', content, flags=re.DOTALL)

    lines = content.split('\n')
    for i in range(len(lines)):
        line = lines[i]
        
        # Replace return solid(...)
        m = re.search(r'return solid\((.*?)\);', line)
        if m:
            inner = m.group(1)
            # solid needs: backgroundDefault=main, backgroundHover=hover, borderDefault=main, borderHover=hover
            # However, we can't easily parse `inner` by comma. We can just extract main and hover using regex.
            # Usually main is the 1st arg, hover is the 2nd arg.
            # Example: AlfColorEnum.Primary, AlfColorEnum.PrimaryHover, ...
            args = inner.split(', AlfColorEnum.')
            main = args[0].strip()
            hover = 'AlfColorEnum.' + args[1].strip()
            lines[i] = f"            return defaultConstruct({inner}, {main}, {hover}, {main}, {hover});"
            continue
            
        m = re.search(r'return depth\((.*?)\);', line)
        if m:
            inner = m.group(1)
            # depth needs: backgroundDefault=main, backgroundHover=hover, borderDefault=Transparent, borderHover=Transparent, borderWidth=None
            if 'linear-gradient' in inner:
                main = 'AlfColorEnum.Light3D'
                hover = "'linear-gradient(to bottom, #e9ecef, #dee2e6)' as any"
            else:
                args = inner.split(', AlfColorEnum.')
                main = args[0].strip()
                hover = 'AlfColorEnum.' + args[1].strip()
            lines[i] = f"            return defaultConstruct({inner}, {main}, {hover}, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);"
            continue
            
        m = re.search(r'return outline\((.*?)\);', line)
        if m:
            inner = m.group(1)
            # outline receives: main, hover, focus, disabled, active, bg, bgHover
            # We need to map to: main, hover, focus, disabled, active, bg, bgHover, borderDefault(main), borderHover(hover)
            args = inner.split(', AlfColorEnum.')
            main = args[0].strip()
            hover = 'AlfColorEnum.' + args[1].strip()
            # bg and bgHover are already at the end of the argument list, so we can't just append bg, bgHover
            # Actually outline ALREADY has 7 arguments. defaultConstruct expects 10.
            # The args in `inner` are exactly: main, hover, focus, disabled, active, bg, bgHover
            # We just need to append main and hover!
            lines[i] = f"            return defaultConstruct({inner}, {main}, {hover});"
            continue
            
        m = re.search(r'return soft\((.*?)\);', line)
        if m:
            inner = m.group(1)
            # soft inner: bg, bgHover, main, hover, focus, disabled, active
            # We need to reorder to match defaultConstruct: main, hover, focus, disabled, active, bg, bgHover, borderDefault, borderHover, borderWidth
            args = inner.split(', AlfColorEnum.')
            bg = args[0].strip()
            bgHover = 'AlfColorEnum.' + args[1].strip()
            main = 'AlfColorEnum.' + args[2].strip()
            hover = 'AlfColorEnum.' + args[3].strip()
            focus = 'AlfColorEnum.' + args[4].strip()
            disabled = 'AlfColorEnum.' + args[5].strip()
            active = 'AlfColorEnum.' + args[6].strip()
            lines[i] = f"            return defaultConstruct({main}, {hover}, {focus}, {disabled}, {active}, {bg}, {bgHover}, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);"
            continue
            
        m = re.search(r'return crystal\((.*?)\);', line)
        if m:
            inner = m.group(1)
            args = inner.split(', AlfColorEnum.')
            bg = args[0].strip()
            bgHover = 'AlfColorEnum.' + args[1].strip()
            main = 'AlfColorEnum.' + args[2].strip()
            hover = 'AlfColorEnum.' + args[3].strip()
            focus = 'AlfColorEnum.' + args[4].strip()
            disabled = 'AlfColorEnum.' + args[5].strip()
            active = 'AlfColorEnum.' + args[6].strip()
            lines[i] = f"            return defaultConstruct({main}, {hover}, {focus}, {disabled}, {active}, {bg}, {bgHover}, AlfColorEnum.White30, AlfColorEnum.White40);"
            continue
            
        m = re.search(r'return ghost\((.*?)\);', line)
        if m:
            inner = m.group(1)
            # ghost inner: main, hover, focus, disabled, active, bgHover
            # We append bg, bgHover, borderDefault, borderHover, borderWidth
            args = inner.split(', AlfColorEnum.')
            # bgHover is the last one
            bgHover = 'AlfColorEnum.' + args[-1].strip()
            if 'Transparent' in bgHover: bgHover = 'AlfColorEnum.Transparent'
            lines[i] = f"            return defaultConstruct({inner.rsplit(', AlfColorEnum.', 1)[0].strip()}, AlfColorEnum.Transparent, {bgHover}, AlfColorEnum.Transparent, AlfColorEnum.Transparent, AlfPxEnum.None);"
            continue
            
    content = '\n'.join(lines)
    return content

with open("c:/Users/alfon/wp/alfcomponents/base/defaultVariants.ts", "r", encoding="utf-8") as f:
    text = f.read()

new_text = process(text)

with open("c:/Users/alfon/wp/alfcomponents/base/defaultVariants.ts", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Replacement complete.")
