import { Component, input, computed, ChangeDetectionStrategy, signal } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfCardTitleConfigInterface } from './interfaces/alf-card-title.interface';
import { AlfBaseDirectives, AlfComponentTypeEnum } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';

@Component({
  selector: 'alf-card-title',
  standalone: true,
  imports: [
    ...ALF_CORE_DIRECTIVES,
  ],
  templateUrl: './alf-card-title.html',
  styleUrl: './alf-card-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfCardTitleComponent extends AlfBaseDirectives {
  protected readonly cssVarPrefix: string = visualprefixEnum.CardTitle as string;
  protected readonly classPrefix: string = 'alf-card-title';

  public readonly inputConfig = input<AlfCardTitleConfigInterface>(undefined, { alias: 'config' });



  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.Card);
    this.initialization(this.classPrefix, this.classPrefix, AlfComponentTypeEnum.Card);
  }

  protected override getControlValue = (): any => {
    return undefined;
  };

  protected override getControlType(): string {
    return 'CardTitle';
  }

  protected override getControlConfig() {
    return this.inputConfig();
  }
}
