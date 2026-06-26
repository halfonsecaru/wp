import { Component, input, computed, ChangeDetectionStrategy, signal } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfCardImgConfigInterface } from './interfaces/alf-card-img.interface';
import { AlfBaseDirectives, AlfComponentTypeEnum, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';

@Component({
  selector: 'alf-card-img',
  standalone: true,
  imports: [
    ...ALF_CORE_DIRECTIVES,
  ],
  templateUrl: './alf-card-img.html',
  styleUrl: './alf-card-img.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardImgComponent extends AlfBaseDirectives {
  protected readonly cssVarPrefix: string = visualprefixEnum.CardImg as string;
  protected readonly classPrefix: string = 'alf-card-img';

  public readonly inputConfig = input<AlfCardImgConfigInterface>(undefined, { alias: 'config' });
  public readonly src = input<string | undefined>();
  public readonly alt = input<string | undefined>();



  protected readonly resolvedSrc = computed(() => this.src() ?? this.inputConfig()?.src ?? '');
  protected readonly resolvedAlt = computed(() => this.alt() ?? this.inputConfig()?.alt ?? '');

  protected readonly predefinedConfig = computed(() => {
    return {};
  });

  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Card);
    this.initialization(this.classPrefix, this.classPrefix, AlfComponentTypeEnum.Card);
  }

  protected override getControlValue = (): any => {
    return undefined;
  };

  protected override getControlType(): string {
    return 'CardImg';
  }

  protected override getControlConfig() {
    return deepMergeStates(this.predefinedConfig(), this.inputConfig());
  }
}
