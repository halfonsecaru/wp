import { Component, HostListener, input, output } from '@angular/core';
import { generateUniqueId } from '@alfcomponents/shared';
import { AlfButtonInterface } from './interfaces/alf-button.interface';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { AlfBaseButtonConfiguration } from '@alfcomponents/components/simple/alf-buttons/base/base-button-configuration';

@Component({
    selector: 'alf-buttons',
    standalone: true,
    imports: [AlfTooltipTextDirective, AlfRippleDirective],
    templateUrl: './alf-buttons.html',
    styleUrl: './alf-buttons.scss',
})
export class AlfButtons extends AlfBaseButtonConfiguration<AlfButtonInterface> {

    // **** Configuracion general del componente **** //
    protected readonly visualPrefix = '--alf-btn';
    protected readonly internalId = generateUniqueId({ prefix: 'button' });
    protected readonly debounceTime = input<number>(0);

    private lastClickTime = 0;

    public readonly onClick = output<MouseEvent>();
    public readonly onHoverEnter = output<MouseEvent>();
    public readonly onHoverLeave = output<MouseEvent>();

    @HostListener('click', ['$event'])
    protected onHostClick = (event: MouseEvent): void => {
        const now = Date.now();
        const threshold = this.debounceTime();

        if (threshold > 0 && (now - this.lastClickTime < threshold)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        this.lastClickTime = now;

        if (event.detail > 0 && event.currentTarget instanceof HTMLElement) {
            event.currentTarget.blur();
        }

        this.onClick.emit(event);
    };

    @HostListener('mouseenter', ['$event'])
    protected onMouseEnter = (event: MouseEvent): void => {
        this.onHoverEnter.emit(event);
    };

    @HostListener('mouseleave', ['$event'])
    protected onMouseLeave = (event: MouseEvent): void => {
        this.onHoverLeave.emit(event);
    };

}


// *********************************************************************** //
