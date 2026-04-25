import { AlfButtonInterface, ButtonLink } from "@alfcomponents/components/simple/alf-buttons/interfaces/alf-button.interface";
import { AlfButtonTypeEnum, AlfIconsUnicodeIconEnum } from "@alfcomponents/enums";
import { computed, Directive, input } from "@angular/core";
import { AlfBaseConfiguration } from "../../../../base/alf-base-configuration";

@Directive()
export abstract class AlfBaseButtonConfiguration<TConfig extends AlfButtonInterface> extends AlfBaseConfiguration<TConfig> {

    protected readonly type = input<AlfButtonTypeEnum>();
    protected readonly label = input<string>();
    protected readonly iconLeft = input<AlfIconsUnicodeIconEnum>();
    protected readonly iconRight = input<AlfIconsUnicodeIconEnum>();
    protected readonly link = input<ButtonLink | undefined>();

    protected readonly typeComputed = computed(() =>
        this.type() ?? this.inputConfig()?.type ?? AlfButtonTypeEnum.Button,
    );

    protected readonly iconLeftComputed = computed(() =>
        this.iconLeft() ?? this.inputConfig()?.iconLeft,
    );

    protected readonly labelComputed = computed(() =>
        this.label() ?? this.inputConfig()?.label ?? this.textStyleComputed()?.default?.text ?? 'Boton',
    );

    protected readonly iconRightComputed = computed(() =>
        this.iconRight() ?? this.inputConfig()?.iconRight,
    );

    protected readonly linkComputed = computed(() =>
        this.link() ?? this.inputConfig()?.link,
    );

}
