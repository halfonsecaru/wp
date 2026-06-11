import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { AlfButton, AlfCheckbox, AlfTabsContainerComponent, AlfTabComponent } from '@alfcomponents/components';
import {
  AlfColorVariantEnum,
  AlfColorEnum,
  AlfSizeEnum,
  AlfPxEnum,
  AlfRadiusEnum,
  AlfBorderStyleEnum,
  AlfShadowEnum,
  AlfFontSizeEnum,
  AlfFontWeightEnum,
  AlfDisplayEnum,
  AlfCssPositionEnum,
  AlfTextAlignEnum,
  AlfCursorEnum,
  AlfPercentageEnum,
  AlfTimingFunctionEnum,
  AlfAnimationTypeEnum,
} from '@alfcomponents/enums';
import {
  AlfBackgroundsInterface,
  AlfBorderInterface,
  AlfShadowsInterface,
  AlfTextStyleInterface,
  AlfPaddingInterface,
  AlfMarginInterface,
  AlfOutlineInterface,
  AlfTypographyInterface,
  AlfTransformInterface,
  AlfTransitionInterface,
  AlfDisplayAndLayoutInterface,
  AlfAnimateCssInterface
} from '@alfcomponents/interfaces';

const enumEntries = (e: Record<string, string>): { key: string; value: string }[] =>
  Object.entries(e).map(([key, value]) => ({ key, value }));

const PX_SUBSET: Record<string, string> = {
  None: '0px', Px1: '1px', Px2: '2px', Px3: '3px', Px4: '4px',
  Px6: '6px', Px8: '8px', Px10: '10px', Px12: '12px', Px16: '16px',
  Px20: '20px', Px24: '24px', Px32: '32px', Px40: '40px', Px48: '48px',
};

type CssState = 'default' | 'hover' | 'focus' | 'active' | 'disabled';

@Component({
  selector: 'app-alf-playground',
  standalone: true,
  imports: [AlfButton, AlfCheckbox, AlfTabsContainerComponent, AlfTabComponent],
  templateUrl: './alf-playground.html',
  styleUrl: './alf-playground.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfPlayground {
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;
  public readonly AlfSizeEnum = AlfSizeEnum;

  public readonly colorOptions = enumEntries(AlfColorEnum);
  public readonly pxOptions = enumEntries(PX_SUBSET);
  public readonly percentOptions = enumEntries(AlfPercentageEnum);
  public readonly radiusOptions = enumEntries(AlfRadiusEnum);
  public readonly borderStyleOptions = enumEntries(AlfBorderStyleEnum);
  public readonly shadowOptions = enumEntries(AlfShadowEnum);
  public readonly fontSizeOptions = enumEntries(AlfFontSizeEnum);
  public readonly fontWeightOptions = enumEntries(AlfFontWeightEnum);
  public readonly variantOptions = enumEntries(AlfColorVariantEnum);
  public readonly sizeOptions = enumEntries(AlfSizeEnum);
  public readonly displayOptions = enumEntries(AlfDisplayEnum);
  public readonly positionOptions = enumEntries(AlfCssPositionEnum);
  public readonly textAlignOptions = enumEntries(AlfTextAlignEnum);
  public readonly cursorOptions = enumEntries(AlfCursorEnum);
  public readonly timingOptions = enumEntries(AlfTimingFunctionEnum);
  public readonly animationOptions = enumEntries(AlfAnimationTypeEnum);

  public readonly components = [
    { id: 'alf-button', label: 'AlfButton', icon: '🔘' },
    { id: 'alf-checkbox', label: 'AlfCheckbox', icon: '☑️' },
  ] as const;
  public readonly selectedComponentId = signal<string>('alf-button');

  public readonly propTabIndex = signal<number>(0);
  public readonly stateTabIndex = signal<number>(0);
  public readonly codeTabIndex = signal<number>(0);

  public readonly compVariant = signal<AlfColorVariantEnum | undefined>(undefined);
  public readonly compSize = signal<AlfSizeEnum | undefined>(undefined);
  public readonly compDisabled = signal<boolean>(false);
  public readonly compLabel = signal<string>('Preview');

  public readonly states: CssState[] = ['default', 'hover', 'focus', 'active', 'disabled'];
  public readonly activeState = computed<CssState>(() => this.states[this.stateTabIndex()] ?? 'default');

  private initStateSignal = () => ({
    default: signal(''), hover: signal(''), focus: signal(''), active: signal(''), disabled: signal('')
  });

  public readonly bgColor = this.initStateSignal();
  
  public readonly borderColor = this.initStateSignal();
  public readonly borderWidth = this.initStateSignal();
  public readonly borderStyle = this.initStateSignal();
  public readonly borderRadius = this.initStateSignal();

  public readonly outlineColor = this.initStateSignal();
  public readonly outlineWidth = this.initStateSignal();
  public readonly outlineStyle = this.initStateSignal();
  public readonly outlineOffset = this.initStateSignal();

  public readonly boxShadow = this.initStateSignal();
  public readonly boxShadowColor = this.initStateSignal();

  public readonly textColor = this.initStateSignal();
  public readonly fontSize = this.initStateSignal();
  public readonly fontWeight = this.initStateSignal();
  
  public readonly typographyColor = this.initStateSignal();
  public readonly typographyFontSize = this.initStateSignal();
  public readonly typographyFontWeight = this.initStateSignal();
  public readonly typographyTextAlign = this.initStateSignal();

  public readonly paddingVal = this.initStateSignal();
  public readonly marginVal = this.initStateSignal();

  public readonly transformScale = this.initStateSignal();
  public readonly transformRotate = this.initStateSignal();

  public readonly transitionDuration = this.initStateSignal();
  public readonly transitionTiming = this.initStateSignal();
  
  public readonly animEnterStage = signal<string | undefined>(undefined);
  public readonly animExitStage = signal<string | undefined>(undefined);
  public readonly animDuration = signal<string | undefined>(undefined);
  public readonly animDelay = signal<string | undefined>(undefined);
  public readonly animIteration = signal<string | undefined>(undefined);
  public readonly animInfinite = signal<boolean>(false);

  public readonly showPreview = signal<boolean>(true);
  public readonly isExiting = signal<boolean>(false);

  public readonly playAnimation = (): void => {
    this.isExiting.set(false);
    this.showPreview.set(false);
    setTimeout(() => this.showPreview.set(true), 10);
  };

  public readonly playExitAnimation = (): void => {
    this.showPreview.set(false);
    setTimeout(() => {
      this.isExiting.set(true);
      this.showPreview.set(true);
    }, 10);
  };

  public readonly layoutDisplay = this.initStateSignal();
  public readonly layoutPosition = this.initStateSignal();
  public readonly layoutCursor = this.initStateSignal();
  public readonly layoutWidth = this.initStateSignal();
  public readonly layoutHeight = this.initStateSignal();

  public readonly animationsConfig = computed<AlfAnimateCssInterface | undefined>(() => {
    const enter = this.animEnterStage();
    const exit = this.animExitStage();
    const duration = this.animDuration();
    const delay = this.animDelay();
    const iteration = this.animIteration();
    const infinite = this.animInfinite();

    if (!enter && !exit && !duration && !delay && !iteration && !infinite) {
      return undefined;
    }

    const config: AlfAnimateCssInterface = {};
    if (enter) config.enterStage = enter;
    if (exit) config.exitStage = exit;
    if (duration) config.duration = duration;
    if (delay) config.delay = delay;
    if (iteration) config.iterationCount = iteration;
    if (infinite) config.infinite = true;

    return config;
  });

  public readonly backgroundConfig = computed<AlfBackgroundsInterface>(() => {
    return this.buildStateConfig(s => {
      const bg = this.bgColor[s]();
      return bg ? { backgroundColor: bg as AlfColorEnum } : undefined;
    });
  });

  public readonly borderConfig = computed<AlfBorderInterface>(() => {
    return this.buildStateConfig(s => {
      const color = this.borderColor[s]();
      const width = this.borderWidth[s]();
      const style = this.borderStyle[s]();
      const radius = this.borderRadius[s]();
      if (!color && !width && !style && !radius) return undefined;
      const result: Record<string, any> = {};
      if (color) result['borderColor'] = color;
      if (width) result['borderWidth'] = width;
      if (style) result['borderStyle'] = style;
      if (radius) result['borderRadius'] = radius;
      return result;
    });
  });

  public readonly outlineConfig = computed<AlfOutlineInterface>(() => {
    return this.buildStateConfig(s => {
      const color = this.outlineColor[s]();
      const width = this.outlineWidth[s]();
      const style = this.outlineStyle[s]();
      const offset = this.outlineOffset[s]();
      if (!color && !width && !style && !offset) return undefined;
      const result: Record<string, any> = {};
      if (color) result['outlineColor'] = color;
      if (width) result['outlineWidth'] = width;
      if (style) result['outlineStyle'] = style;
      if (offset) result['outlineOffset'] = offset;
      return result;
    });
  });

  public readonly shadowsConfig = computed<AlfShadowsInterface>(() => {
    return this.buildStateConfig(s => {
      const shadow = this.boxShadow[s]();
      const color = this.boxShadowColor[s]();
      if (!shadow && !color) return undefined;
      const result: Record<string, any> = {};
      if (shadow) result['boxShadow'] = shadow;
      if (color) result['boxShadowColor'] = color;
      return result;
    });
  });

  public readonly textStyleConfig = computed<AlfTextStyleInterface>(() => {
    return this.buildStateConfig(s => {
      const color = this.textColor[s]();
      const size = this.fontSize[s]();
      const weight = this.fontWeight[s]();
      if (!color && !size && !weight) return undefined;
      const result: Record<string, any> = {};
      if (color) result['color'] = color;
      if (size) result['fontSize'] = size;
      if (weight) result['fontWeight'] = weight;
      return result;
    });
  });

  public readonly typographyConfig = computed<AlfTypographyInterface>(() => {
    return this.buildStateConfig(s => {
      const color = this.typographyColor[s]();
      const size = this.typographyFontSize[s]();
      const weight = this.typographyFontWeight[s]();
      const align = this.typographyTextAlign[s]();
      if (!color && !size && !weight && !align) return undefined;
      const result: Record<string, any> = {};
      if (color) result['color'] = color;
      if (size) result['fontSize'] = size;
      if (weight) result['fontWeight'] = weight;
      if (align) result['textAlign'] = align;
      return result;
    });
  });

  public readonly paddingConfig = computed<AlfPaddingInterface>(() => {
    return this.buildStateConfig(s => {
      const p = this.paddingVal[s]();
      return p ? { padding: p as AlfPxEnum } : undefined;
    });
  });

  public readonly marginConfig = computed<AlfMarginInterface>(() => {
    return this.buildStateConfig(s => {
      const m = this.marginVal[s]();
      return m ? { margin: m as AlfPxEnum } : undefined;
    });
  });

  public readonly transformConfig = computed<AlfTransformInterface>(() => {
    return this.buildStateConfig(s => {
      const scale = this.transformScale[s]();
      const rotate = this.transformRotate[s]();
      if (!scale && !rotate) return undefined;
      const result: Record<string, any> = {};
      if (scale) result['scale'] = Number(scale);
      if (rotate) result['rotate'] = Number(rotate);
      return result;
    });
  });

  public readonly transitionConfig = computed<AlfTransitionInterface>(() => {
    return this.buildStateConfig(s => {
      const duration = this.transitionDuration[s]();
      const timingFunction = this.transitionTiming[s]();
      if (!duration && !timingFunction) return undefined;
      const result: Record<string, any> = {};
      if (duration) result['duration'] = duration;
      if (timingFunction) result['timingFunction'] = timingFunction;
      return result;
    });
  });

  public readonly displayLayoutConfig = computed<AlfDisplayAndLayoutInterface>(() => {
    return this.buildStateConfig(s => {
      const display = this.layoutDisplay[s]();
      const position = this.layoutPosition[s]();
      const cursor = this.layoutCursor[s]();
      const w = this.layoutWidth[s]();
      const h = this.layoutHeight[s]();
      if (!display && !position && !cursor && !w && !h) return undefined;
      const result: Record<string, any> = {};
      if (display) result['display'] = display;
      if (position) result['position'] = position;
      if (cursor) result['cursor'] = cursor;
      if (w) result['width'] = w;
      if (h) result['height'] = h;
      return result;
    });
  });

  public readonly onComponentChange = (event: Event): void => {
    this.selectedComponentId.set((event.target as HTMLSelectElement).value);
    this.resetAll();
  };

  public readonly onSelectChange = (sig: ReturnType<typeof signal<string>>, event: Event): void => {
    sig.set((event.target as HTMLSelectElement).value);
  };

  public readonly onInputChange = (sig: ReturnType<typeof signal<string>>, event: Event): void => {
    sig.set((event.target as HTMLInputElement).value);
  };

  public readonly onCheckboxChange = (sig: ReturnType<typeof signal<boolean>>, event: Event): void => {
    sig.set((event.target as HTMLInputElement).checked);
  };

  public readonly onVariantChange = (event: Event): void => {
    const val = (event.target as HTMLSelectElement).value;
    this.compVariant.set(val ? val as AlfColorVariantEnum : undefined);
  };

  public readonly onSizeChange = (event: Event): void => {
    const val = (event.target as HTMLSelectElement).value;
    this.compSize.set(val ? val as AlfSizeEnum : undefined);
  };

  public readonly onDisabledToggle = (): void => {
    this.compDisabled.update(v => !v);
  };

  public readonly resetAll = (): void => {
    this.compVariant.set(undefined);
    this.compSize.set(undefined);
    this.compDisabled.set(false);
    this.compLabel.set('Preview');
    this.propTabIndex.set(0);
    this.stateTabIndex.set(0);

    this.animEnterStage.set(undefined);
    this.animExitStage.set(undefined);
    this.animDuration.set(undefined);
    this.animDelay.set(undefined);
    this.animIteration.set(undefined);
    this.animInfinite.set(false);

    for (const s of this.states) {
      this.bgColor[s].set('');
      this.borderColor[s].set('');
      this.borderWidth[s].set('');
      this.borderStyle[s].set('');
      this.borderRadius[s].set('');
      this.outlineColor[s].set('');
      this.outlineWidth[s].set('');
      this.outlineStyle[s].set('');
      this.outlineOffset[s].set('');
      this.boxShadow[s].set('');
      this.boxShadowColor[s].set('');
      this.textColor[s].set('');
      this.fontSize[s].set('');
      this.fontWeight[s].set('');
      this.typographyColor[s].set('');
      this.typographyFontSize[s].set('');
      this.typographyFontWeight[s].set('');
      this.typographyTextAlign[s].set('');
      this.paddingVal[s].set('');
      this.marginVal[s].set('');
      this.transformScale[s].set('');
      this.transformRotate[s].set('');
      this.transitionDuration[s].set('');
      this.transitionTiming[s].set('');
      this.layoutDisplay[s].set('');
      this.layoutPosition[s].set('');
      this.layoutCursor[s].set('');
      this.layoutWidth[s].set('');
      this.layoutHeight[s].set('');
    }
  };

  private readonly buildStateConfig = <T>(fn: (state: CssState) => T | undefined): Record<string, T> => {
    const result: Record<string, T> = {};
    for (const s of this.states) {
      const val = fn(s);
      if (val) result[s] = val;
    }
    return result;
  };

  public readonly htmlPreview = computed<string>(() => {
    const parts: string[] = [];
    const comp = this.selectedComponentId();
    const variant = this.compVariant();
    const size = this.compSize();
    const label = this.compLabel();

    parts.push(`<${comp}`);
    if (label) parts.push(`  label="${label}"`);
    if (variant) parts.push(`  variant="${variant}"`);
    if (size) parts.push(`  size="${size}"`);
    if (this.compDisabled()) parts.push(`  [isDisabled]="true"`);

    if (Object.keys(this.backgroundConfig()).length) parts.push(`  [background]="myBackgroundConfig"`);
    if (Object.keys(this.borderConfig()).length) parts.push(`  [border]="myBorderConfig"`);
    if (Object.keys(this.outlineConfig()).length) parts.push(`  [outline]="myOutlineConfig"`);
    if (Object.keys(this.shadowsConfig()).length) parts.push(`  [shadows]="myShadowsConfig"`);
    if (Object.keys(this.textStyleConfig()).length) parts.push(`  [textStyle]="myTextStyleConfig"`);
    if (Object.keys(this.typographyConfig()).length) parts.push(`  [typography]="myTypographyConfig"`);
    if (Object.keys(this.paddingConfig()).length) parts.push(`  [padding]="myPaddingConfig"`);
    if (Object.keys(this.marginConfig()).length) parts.push(`  [margin]="myMarginConfig"`);
    if (Object.keys(this.transformConfig()).length) parts.push(`  [transform]="myTransformConfig"`);
    if (Object.keys(this.transitionConfig()).length) parts.push(`  [transition]="myTransitionConfig"`);
    if (this.animationsConfig() && Object.keys(this.animationsConfig()!).length) parts.push(`  [animations]="myAnimationsConfig"`);
    if (Object.keys(this.displayLayoutConfig()).length) parts.push(`  [displayAndLayout]="myDisplayLayoutConfig"`);

    parts.push(`/>`);
    return parts.join('\n');
  });

  public readonly tsPreview = computed<string>(() => {
    const parts: string[] = [];
    
    const bg = this.backgroundConfig();
    if (Object.keys(bg).length) parts.push(`public myBackgroundConfig: AlfBackgroundsInterface = ${this.stringifyConfig(bg)};\n`);
    
    const border = this.borderConfig();
    if (Object.keys(border).length) parts.push(`public myBorderConfig: AlfBorderInterface = ${this.stringifyConfig(border)};\n`);

    const outline = this.outlineConfig();
    if (Object.keys(outline).length) parts.push(`public myOutlineConfig: AlfOutlineInterface = ${this.stringifyConfig(outline)};\n`);

    const shadows = this.shadowsConfig();
    if (Object.keys(shadows).length) parts.push(`public myShadowsConfig: AlfShadowsInterface = ${this.stringifyConfig(shadows)};\n`);

    const text = this.textStyleConfig();
    if (Object.keys(text).length) parts.push(`public myTextStyleConfig: AlfTextStyleInterface = ${this.stringifyConfig(text)};\n`);

    const typo = this.typographyConfig();
    if (Object.keys(typo).length) parts.push(`public myTypographyConfig: AlfTypographyInterface = ${this.stringifyConfig(typo)};\n`);

    const pad = this.paddingConfig();
    if (Object.keys(pad).length) parts.push(`public myPaddingConfig: AlfPaddingInterface = ${this.stringifyConfig(pad)};\n`);

    const marg = this.marginConfig();
    if (Object.keys(marg).length) parts.push(`public myMarginConfig: AlfMarginInterface = ${this.stringifyConfig(marg)};\n`);

    const trans = this.transformConfig();
    if (Object.keys(trans).length) parts.push(`public myTransformConfig: AlfTransformInterface = ${this.stringifyConfig(trans)};\n`);

    const transition = this.transitionConfig();
    if (Object.keys(transition).length) parts.push(`public myTransitionConfig: AlfTransitionInterface = ${this.stringifyConfig(transition)};\n`);

    const anims = this.animationsConfig();
    if (anims && Object.keys(anims).length) parts.push(`public myAnimationsConfig: AlfAnimateCssInterface = ${this.stringifyConfig(anims)};\n`);

    const layout = this.displayLayoutConfig();
    if (Object.keys(layout).length) parts.push(`public myDisplayLayoutConfig: AlfDisplayAndLayoutInterface = ${this.stringifyConfig(layout)};\n`);

    if (parts.length === 0) {
      return '// Sin configuraciones adicionales por el momento';
    }

    return parts.join('\n');
  });

  private readonly propEnumMap: Record<string, { enumName: string, entries: {key: string, value: string}[] }[]> = {
    backgroundColor: [{ enumName: 'AlfColorEnum', entries: enumEntries(AlfColorEnum) }],
    borderColor: [{ enumName: 'AlfColorEnum', entries: enumEntries(AlfColorEnum) }],
    outlineColor: [{ enumName: 'AlfColorEnum', entries: enumEntries(AlfColorEnum) }],
    boxShadowColor: [{ enumName: 'AlfColorEnum', entries: enumEntries(AlfColorEnum) }],
    color: [{ enumName: 'AlfColorEnum', entries: enumEntries(AlfColorEnum) }],
    
    borderWidth: [{ enumName: 'AlfPxEnum', entries: enumEntries(AlfPxEnum) }],
    outlineWidth: [{ enumName: 'AlfPxEnum', entries: enumEntries(AlfPxEnum) }],
    outlineOffset: [{ enumName: 'AlfPxEnum', entries: enumEntries(AlfPxEnum) }],
    padding: [{ enumName: 'AlfPxEnum', entries: enumEntries(AlfPxEnum) }],
    margin: [{ enumName: 'AlfPxEnum', entries: enumEntries(AlfPxEnum) }],
    
    width: [{ enumName: 'AlfPercentageEnum', entries: enumEntries(AlfPercentageEnum) }, { enumName: 'AlfPxEnum', entries: enumEntries(AlfPxEnum) }],
    height: [{ enumName: 'AlfPercentageEnum', entries: enumEntries(AlfPercentageEnum) }, { enumName: 'AlfPxEnum', entries: enumEntries(AlfPxEnum) }],
    
    borderStyle: [{ enumName: 'AlfBorderStyleEnum', entries: enumEntries(AlfBorderStyleEnum) }],
    outlineStyle: [{ enumName: 'AlfBorderStyleEnum', entries: enumEntries(AlfBorderStyleEnum) }],
    
    borderRadius: [{ enumName: 'AlfRadiusEnum', entries: enumEntries(AlfRadiusEnum) }],
    boxShadow: [{ enumName: 'AlfShadowEnum', entries: enumEntries(AlfShadowEnum) }],
    fontSize: [{ enumName: 'AlfFontSizeEnum', entries: enumEntries(AlfFontSizeEnum) }],
    fontWeight: [{ enumName: 'AlfFontWeightEnum', entries: enumEntries(AlfFontWeightEnum) }],
    textAlign: [{ enumName: 'AlfTextAlignEnum', entries: enumEntries(AlfTextAlignEnum) }],
    display: [{ enumName: 'AlfDisplayEnum', entries: enumEntries(AlfDisplayEnum) }],
    position: [{ enumName: 'AlfCssPositionEnum', entries: enumEntries(AlfCssPositionEnum) }],
    cursor: [{ enumName: 'AlfCursorEnum', entries: enumEntries(AlfCursorEnum) }],
    enterStage: [{ enumName: 'AlfAnimationTypeEnum', entries: enumEntries(AlfAnimationTypeEnum) }],
    exitStage: [{ enumName: 'AlfAnimationTypeEnum', entries: enumEntries(AlfAnimationTypeEnum) }],
    timingFunction: [{ enumName: 'AlfTimingFunctionEnum', entries: enumEntries(AlfTimingFunctionEnum) }],
  };

  private formatConfigValue(prop: string, val: any): string {
    if (typeof val === 'number') return val.toString();
    if (typeof val === 'boolean') return val.toString();
    
    const mappings = this.propEnumMap[prop];
    if (mappings) {
      for (const mapping of mappings) {
        const entry = mapping.entries.find(e => e.value === val);
        if (entry) {
          return `${mapping.enumName}.${entry.key}`;
        }
      }
    }
    return `'${val}'`;
  }

  private stringifyConfig(obj: any, indent: string = ''): string {
    if (!obj || typeof obj !== 'object') return String(obj);
    
    const lines: string[] = [];
    lines.push('{');
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object') {
        lines.push(`${indent}  ${key}: ${this.stringifyConfig(value, indent + '  ')},`);
      } else {
        lines.push(`${indent}  ${key}: ${this.formatConfigValue(key, value)},`);
      }
    }
    lines.push(`${indent}}`);
    return lines.join('\n');
  }

  private readonly miniJSON = (obj: unknown): string => {
    return JSON.stringify(obj, null, 2).replace(/"/g, "'");
  };
}
