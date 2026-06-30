import { Component, ChangeDetectionStrategy } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
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

  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.CardActions);
    this.initialization(this.classPrefix, this.classPrefix, AlfComponentTypeEnum.CardActions);
  }

  protected override getControlValue = (): any => {
    return undefined;
  };

  protected override getControlType(): string {
    return AlfComponentTypeEnum.CardActions;
  }

}
