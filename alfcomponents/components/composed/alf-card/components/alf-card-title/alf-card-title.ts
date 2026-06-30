import { Component, ChangeDetectionStrategy } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';

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

  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.CardTitle);
    this.initialization(this.classPrefix, this.classPrefix, AlfComponentTypeEnum.CardTitle);
  }

  protected override getControlValue = (): any => {
    return undefined;
  };

  protected override getControlType(): string {
    return AlfComponentTypeEnum.CardTitle;
  }

}
