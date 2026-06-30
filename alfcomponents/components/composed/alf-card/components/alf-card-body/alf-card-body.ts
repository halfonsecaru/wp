import { Component, ChangeDetectionStrategy } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';

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
export class AlfCardBodyComponent extends AlfBaseDirectives {
  protected readonly cssVarPrefix: string = visualprefixEnum.CardBody as string;
  protected readonly classPrefix: string = 'alf-card-body';

  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.CardBody);
    this.initialization(this.classPrefix, this.classPrefix, AlfComponentTypeEnum.CardBody);
  }

  protected override getControlValue = (): any => {
    return undefined;
  };

  protected override getControlType(): string {
    return AlfComponentTypeEnum.CardBody;
  }

}
