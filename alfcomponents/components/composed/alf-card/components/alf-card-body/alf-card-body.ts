import { Component, input, computed, ChangeDetectionStrategy, signal } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfComponentTypeEnum } from '@alfcomponents/base/defaultVariants';
import { AlfCardBodyConfigInterface } from './interfaces/alf-card-body.interface';
import { AlfBaseDirectives, deepMergeStates } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';

@Component({
  selector: 'alf-card-body',
  standalone: true,
  imports: [
    ...ALF_CORE_DIRECTIVES,
  ],
  templateUrl: './alf-card-body.html',
  styleUrl: './alf-card-body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardBodyComponent extends AlfBaseDirectives<AlfCardBodyConfigInterface> {
  protected readonly cssVarPrefix: string = visualprefixEnum.CardBody as string;
  protected readonly classPrefix: string = 'alf-card-body';

  public readonly inputConfig = input<AlfCardBodyConfigInterface>(undefined, { alias: 'config' });
  private readonly _disabled = signal<boolean>(false);

  public readonly disabledComputed = computed<boolean>(() => {
    return !!(this.disabled() || this.inputConfig()?.disabled || this._disabled());
  });

  protected readonly predefinedConfig = computed(() => {
    return {
    };
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
    return 'CardBody';
  }

  protected override getControlConfig() {
    return deepMergeStates(this.predefinedConfig(), this.inputConfig());
  }
}
