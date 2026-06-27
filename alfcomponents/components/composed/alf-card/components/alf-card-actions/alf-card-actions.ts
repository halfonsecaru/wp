import { Component, input, computed, ChangeDetectionStrategy, signal } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfCardActionsConfigInterface } from './interfaces/alf-card-actions.interface';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { deepMergeStates } from '@alfcomponents/components/base/default/functions';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';

@Component({
  selector: 'alf-card-actions',
  standalone: true,
  imports: [
    ...ALF_CORE_DIRECTIVES,
  ],
  templateUrl: './alf-card-actions.html',
  styleUrl: './alf-card-actions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardActionsComponent extends AlfBaseDirectives {
  protected readonly cssVarPrefix: string = visualprefixEnum.CardActions as string;
  protected readonly classPrefix: string = 'alf-card-actions';

  public readonly inputConfig = input<AlfCardActionsConfigInterface>(undefined, { alias: 'config' });



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
    return 'CardActions';
  }

  protected override getControlConfig() {
    return deepMergeStates(this.predefinedConfig(), this.inputConfig());
  }
}
