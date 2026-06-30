import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfBaseDirectives } from '@alfcomponents/components/base/bases.directive';
import { ALF_CORE_DIRECTIVES } from '@alfcomponents/directives';
import { AlfComponentTypeEnum } from '@alfcomponents/components/base/enum/AlfComponentType.enum';

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

  public readonly src = input<string | undefined>();
  public readonly alt = input<string | undefined>();

  constructor() {
    super();
    this.componentType.set(AlfComponentTypeEnum.CardImage);
    this.initialization(this.classPrefix, this.classPrefix, AlfComponentTypeEnum.CardImage);
  }

  protected override getControlValue = (): any => {
    return undefined;
  };

  protected override getControlType(): string {
    return AlfComponentTypeEnum.CardImage;
  }


}
