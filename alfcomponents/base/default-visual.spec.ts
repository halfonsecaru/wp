import { describe, expect, it } from 'vitest';
import { resolveDefaultVisual } from './default-visual';
import { AlfButtonVisualTypeEnum, AlfColorVariantEnum, AlfVisualPredefinedEnum } from '@alfcomponents/enums';

describe('resolveDefaultVisual', () => {
  const LIGHT_TEXT_COLOR = '#9a9a9a';
  const visualTypes: readonly AlfButtonVisualTypeEnum[] = [
    AlfButtonVisualTypeEnum.Solid,
    AlfButtonVisualTypeEnum.Outlined,
    AlfButtonVisualTypeEnum.Text,
    AlfButtonVisualTypeEnum.Ghost,
    AlfButtonVisualTypeEnum.Soft,
    AlfButtonVisualTypeEnum.Crystal,
    AlfButtonVisualTypeEnum.ThreeD,
    AlfButtonVisualTypeEnum.Glossy,
    AlfButtonVisualTypeEnum.Gradient,
    AlfButtonVisualTypeEnum.Raised,
  ];

  it.each(visualTypes)(
    'mantiene color de texto Light en default/hover/active para %s',
    (visualType) => {
      const visual = resolveDefaultVisual({
        colorVariant: AlfColorVariantEnum.Light,
        visualType,
      });

      expect(visual.textStyle?.default?.color).toBe(LIGHT_TEXT_COLOR);
      expect(visual.typography?.default?.color).toBe(LIGHT_TEXT_COLOR);

      if (visual.textStyle?.hover?.color) {
        expect(visual.textStyle.hover.color).toBe(LIGHT_TEXT_COLOR);
      }
      if (visual.textStyle?.active?.color) {
        expect(visual.textStyle.active.color).toBe(LIGHT_TEXT_COLOR);
      }
      if (visual.typography?.hover?.color) {
        expect(visual.typography.hover.color).toBe(LIGHT_TEXT_COLOR);
      }
      if (visual.typography?.active?.color) {
        expect(visual.typography.active.color).toBe(LIGHT_TEXT_COLOR);
      }
    },
  );

  it('mantiene color Light cuando viene por predefined', () => {
    const solidLight = resolveDefaultVisual({ predefined: AlfVisualPredefinedEnum.SolidLight });
    const outlinedLight = resolveDefaultVisual({ predefined: AlfVisualPredefinedEnum.OutlinedLight });

    expect(solidLight.textStyle?.default?.color).toBe(LIGHT_TEXT_COLOR);
    expect(solidLight.typography?.default?.color).toBe(LIGHT_TEXT_COLOR);
    expect(outlinedLight.textStyle?.default?.color).toBe(LIGHT_TEXT_COLOR);
    expect(outlinedLight.typography?.default?.color).toBe(LIGHT_TEXT_COLOR);
  });
});
