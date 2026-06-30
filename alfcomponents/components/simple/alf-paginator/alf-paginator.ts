import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, signal, ViewEncapsulation } from "@angular/core";
import { AlfBaseDirectives } from "@alfcomponents/components/base/bases.directive";
import { AlfAlignItemsEnum, AlfBorderStyleEnum, AlfColorEnum, AlfColorVariantEnum, AlfDisplayEnum, AlfFlexDirectionEnum, AlfIconsUnicodeIconEnum, AlfJustifyContentEnum, AlfPxEnum, AlfRadiusEnum } from "@alfcomponents/enums";
import { AlfButtonInterface } from "../alf-button/interfaces/alf-button.interface";
import { generateUniqueId, visualprefixEnum } from "@alfcomponents/shared";
import { AlfComponentTypeEnum } from "@alfcomponents/components/base/enum/AlfComponentType.enum";
import { ALF_CORE_DIRECTIVES } from "@alfcomponents/directives";
import { AlfPageEvent } from "./interfaces/alf-paginator.interface";
import { getAlfPaginatorLabel } from "./i18n/alf-paginator.i18n";

@Component({
    selector: 'alf-paginator',
    standalone: true,
    imports: [...ALF_CORE_DIRECTIVES],
    templateUrl: './alf-paginator.html',
    styleUrl: './alf-paginator.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AlfPaginator extends AlfBaseDirectives {

    // ── 1. Constants & Visual Prefixes ───────────────────────────────────────
    protected readonly cssVarPrefix: string = visualprefixEnum.Paginator as string;
    protected readonly classPrefix: string = visualprefixEnum.PaginatorClass as string;

    // Enums for Template
    public readonly AlfColorVariantEnum = AlfColorVariantEnum;
    public readonly AlfPxEnum = AlfPxEnum;

    // ── 2. Inputs & Models ────────────────────────────────────────────────────
    public readonly id = input<string>();
    public readonly page = model<number>(1);
    public readonly appearance = input<'standard' | 'full' | 'sm' | 'none'>('standard');

    // Logic
    public readonly totalItems = input.required<number>();
    public readonly itemsPerPage = input<number>(10);
    public readonly maxSize = input<number>(5);
    public readonly hideEllipsis = input<boolean>(false);
    public readonly showPageInfo = input<boolean>(false);
    public readonly pageInfoLabel = input<string>();
    public readonly pageInfoColor = input<AlfColorEnum>();
    public readonly pageInfoPosition = input<'left' | 'right' | 'top' | 'bottom'>('right');

    // Icons & Labels Control
    public readonly showFirstLastButtons = input<boolean>(true);
    public readonly firstLabel = input<string>();
    public readonly lastLabel = input<string>();
    public readonly prevLabel = input<string>();
    public readonly nextLabel = input<string>();
    public readonly firstIcon = input<AlfIconsUnicodeIconEnum | string>();
    public readonly lastIcon = input<AlfIconsUnicodeIconEnum | string>();
    public readonly prevIcon = input<AlfIconsUnicodeIconEnum | string>();
    public readonly nextIcon = input<AlfIconsUnicodeIconEnum | string>();

    // Button Delegation Configs
    public readonly buttonConfig = input<Partial<AlfButtonInterface>>();
    public readonly activeButtonConfig = input<Partial<AlfButtonInterface>>();
    public readonly navButtonConfig = input<Partial<AlfButtonInterface>>();

    // Layout & State
    public readonly align = input<'start' | 'center' | 'end'>('center');
    public readonly gap = input<AlfPxEnum>();
    public readonly loading = input<boolean>(false);

    // ── 3. Outputs ────────────────────────────────────────────────────────────
    public readonly pageChanged = output<AlfPageEvent>();

    // ── 4. Internal State (Signals & Variables) ───────────────────────────────
    private readonly internalId = generateUniqueId({ prefix: visualprefixEnum.PaginatorInternalId });
    protected readonly animationClass = signal<string>('');
    private animTimeout: any;

    // ── 5. Computed State (Derived from Inputs & State) ───────────────────────
    protected readonly idComputed = computed(() => this.id() ?? this.internalId);
    protected readonly iconFirstComputed = computed(() => this.firstIcon() ?? AlfIconsUnicodeIconEnum.ChevronDoubleLeft);
    protected readonly iconBackComputed = computed(() => this.prevIcon() ?? AlfIconsUnicodeIconEnum.ChevronLeftSlim);
    protected readonly iconNextComputed = computed(() => this.nextIcon() ?? AlfIconsUnicodeIconEnum.ChevronRightSlim);
    protected readonly iconLastComputed = computed(() => this.lastIcon() ?? AlfIconsUnicodeIconEnum.ChevronDoubleRight);

    private readonly _layoutEffect = effect(() => {
        const alignVal = this.align();
        const posVal = this.pageInfoPosition();

        const justify = alignVal === 'start' ? AlfJustifyContentEnum.Start : (alignVal === 'end' ? AlfJustifyContentEnum.End : AlfJustifyContentEnum.Center);

        let flexDir = AlfFlexDirectionEnum.RowReverse;
        if (posVal === 'left') flexDir = AlfFlexDirectionEnum.Row;
        else if (posVal === 'right') flexDir = AlfFlexDirectionEnum.RowReverse;
        else if (posVal === 'top') flexDir = AlfFlexDirectionEnum.Column;
        else if (posVal === 'bottom') flexDir = AlfFlexDirectionEnum.ColumnReverse;

        const layoutState = {
            display: AlfDisplayEnum.Flex,
            flexDirection: flexDir,
            justifyContent: justify,
            alignItems: AlfAlignItemsEnum.Center
        };

        this.setDisplayAndLayout({
            default: layoutState,
            hover: layoutState,
            focus: layoutState,
            active: layoutState,
            disabled: layoutState
        });
    });

    private readonly _appearanceEffect = effect(() => {
        const app = this.appearance();

        if (app === 'none') {
            const transBg = { backgroundColor: AlfColorEnum.Transparent, backgroundImage: 'none' };
            this.setBackground({
                default: transBg, hover: transBg, focus: transBg, active: transBg, disabled: transBg
            });

            const noneBd = {
                borderColor: AlfColorEnum.Transparent,
                borderStyle: AlfBorderStyleEnum.None,
                borderWidth: AlfPxEnum.None,
                borderRadius: AlfRadiusEnum.None
            };
            this.setBorder({
                default: noneBd, hover: noneBd, focus: noneBd, active: noneBd, disabled: noneBd
            });
        } else {
            let rad: AlfRadiusEnum = AlfRadiusEnum.Md;
            if (app === 'full') rad = AlfRadiusEnum.Full;
            else if (app === 'sm') rad = AlfRadiusEnum.Sm;
            else if (app === 'standard') rad = AlfRadiusEnum.Md;

            const radBd = { borderRadius: rad };
            this.setBorder({
                default: radBd, hover: radBd, focus: radBd, active: radBd, disabled: radBd
            });
        }
    });

    protected readonly mergedButtonConfig = computed<Partial<AlfButtonInterface>>(() => this.buttonConfig() ?? {});

    protected readonly totalPages = computed(() => {
        const items = this.totalItems();
        const perPage = this.itemsPerPage();
        if (!items || !perPage || perPage <= 0) return 1;
        const total = Math.ceil(items / perPage);
        return Math.max(1, total);
    });

    protected readonly visiblePages = computed<number[]>(() => {
        const total = this.totalPages();
        const current = this.page();
        const maxSize = this.maxSize();

        if (total <= maxSize) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const half = Math.floor(maxSize / 2);
        let start = Math.max(1, current - half);
        let end = start + maxSize - 1;

        if (end > total) {
            end = total;
            start = Math.max(1, end - maxSize + 1);
        }
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });


    protected readonly mergedActiveButtonConfig = computed<Partial<AlfButtonInterface>>(() => ({
        ...this.mergedButtonConfig(),
        ...this.activeButtonConfig()
    }));

    protected readonly mergedNavButtonConfig = computed<Partial<AlfButtonInterface>>(() => ({
        ...this.mergedButtonConfig(),
        ...this.navButtonConfig()
    }));

    protected readonly firstPageAriaLabel = computed(() => getAlfPaginatorLabel('firstPageLabel'));
    protected readonly lastPageAriaLabel = computed(() => getAlfPaginatorLabel('lastPageLabel'));
    protected readonly prevPageAriaLabel = computed(() => getAlfPaginatorLabel('previousPageLabel'));
    protected readonly nextPageAriaLabel = computed(() => getAlfPaginatorLabel('nextPageLabel'));

    protected readonly resolvedPageInfo = computed(() => {
        const current = this.page();
        const total = this.totalPages();
        const customLabel = this.pageInfoLabel();

        if (customLabel) {
            return customLabel
                .replace('{{current}}', current.toString())
                .replace('{{total}}', total.toString());
        }

        const rangeFn = getAlfPaginatorLabel('getRangeLabel');
        return rangeFn(current - 1, this.itemsPerPage(), this.totalItems());
    });

    // ── 6. Constructor ────────────────────────────────────────────────────────
    constructor() {
        super();
        this.initialization(visualprefixEnum.Paginator, visualprefixEnum.PaginatorClass, AlfComponentTypeEnum.Paginator);
    };

    // ── 7. Methods ────────────────────────────────────────────────────────────
    public goTo(page: number | string): void {
        if (typeof page === 'string' || this.disabled() || this.loading()) return;
        const current = this.page();
        const total = this.totalPages();
        const target = Math.min(Math.max(page, 1), total);

        if (target !== current) {
            const prev = current;
            const anim = target > prev ? 'alf-paginator-pages--slide-right' : 'alf-paginator-pages--slide-left';

            this.page.set(target);
            this.pageChanged.emit({
                page: target,
                itemsPerPage: this.itemsPerPage(),
                previousPage: prev
            });

            if (this.animTimeout) clearTimeout(this.animTimeout);
            this.animationClass.set('');
            requestAnimationFrame(() => {
                this.animationClass.set(anim);
                this.animTimeout = setTimeout(() => {
                    this.animationClass.set('');
                }, 400);
            });
        }
    }

    public next(): void {
        this.goTo(this.page() + 1);
    }

    public prev(): void {
        this.goTo(this.page() - 1);
    }

    public first(): void {
        this.goTo(1);
    }

    public last(): void {
        this.goTo(this.totalPages());
    }
}