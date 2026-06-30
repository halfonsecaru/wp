import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { AlfPaginator } from '@alfcomponents/components';
import { AlfPageEvent } from '@alfcomponents/components/simple/alf-paginator/interfaces/alf-paginator.interface';
import { AlfColorEnum, AlfColorVariantEnum, AlfPxEnum, AlfSizeEnum } from '@alfcomponents/enums';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-alf-paginator-viewer',
  standalone: true,
  imports: [AlfPaginator, JsonPipe],
  templateUrl: './alf-paginator-viewer.html',
  styleUrl: './alf-paginator-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfPaginatorViewer {

  public readonly AlfSizeEnum = AlfSizeEnum;
  public readonly AlfPxEnum = AlfPxEnum;
  public readonly AlfColorEnum = AlfColorEnum;
  public readonly AlfColorVariantEnum = AlfColorVariantEnum;

  // Signals para controlar las páginas independientes de la demo
  public readonly pageBasic = signal<number>(1);

  // Appearance Signals
  public readonly pageAppStandard = signal<number>(1);
  public readonly pageAppFull = signal<number>(2);
  public readonly pageAppSm = signal<number>(3);
  public readonly pageAppNone = signal<number>(4);

  // Variant Color Signals
  public readonly pageVarPrimary = signal<number>(1);
  public readonly pageVarSecondary = signal<number>(2);
  public readonly pageVarSuccess = signal<number>(3);
  public readonly pageVarDanger = signal<number>(4);
  public readonly pageVarWarning = signal<number>(5);
  public readonly pageVarInfo = signal<number>(2);
  public readonly pageVarDark = signal<number>(3);

  public readonly pageVarPrimaryOut = signal<number>(1);
  public readonly pageVarSecondaryOut = signal<number>(2);
  public readonly pageVarSuccessOut = signal<number>(3);
  public readonly pageVarDangerOut = signal<number>(4);

  public readonly pageVarPrimarySoft = signal<number>(1);
  public readonly pageVarSuccessSoft = signal<number>(2);
  public readonly pageVarPurpleGrad = signal<number>(3);

  public readonly pageInfoRight = signal<number>(2);
  public readonly pageInfoLeft = signal<number>(3);
  public readonly pageInfoTop = signal<number>(4);
  public readonly pageInfoBottom = signal<number>(5);
  
  public readonly pageAlignStart = signal<number>(1);
  public readonly pageAlignCenter = signal<number>(2);
  public readonly pageAlignEnd = signal<number>(3);

  public readonly pageGrouped = signal<number>(1);
  public readonly pageLoading = signal<number>(3);
  public readonly pageDisabled = signal<number>(2);

  public readonly lastEvent = signal<AlfPageEvent | null>(null);

  public onPageChange(event: AlfPageEvent): void {
    this.lastEvent.set(event);
    console.log('Paginación modificada:', event);
  }
}
