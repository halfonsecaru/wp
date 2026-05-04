import { AlfButtonInterface, ButtonLink } from "@alfcomponents/components/simple/alf-buttons/interfaces/alf-button.interface";
import { AlfButtonTypeEnum, AlfIconsUnicodeIconEnum } from "@alfcomponents/enums";
import { computed, Directive, input } from "@angular/core";
import { AlfBaseConfiguration } from "../../../../base/alf-base-configuration";

@Directive()
export abstract class AlfBaseButtonConfiguration<TConfig extends AlfButtonInterface> extends AlfBaseConfiguration<TConfig> {

    public readonly type = input<AlfButtonTypeEnum>();
    public readonly label = input<string>();
    public readonly iconLeft = input<AlfIconsUnicodeIconEnum>();
    public readonly iconRight = input<AlfIconsUnicodeIconEnum>();
    public readonly link = input<ButtonLink | undefined>();

    public readonly typeComputed = computed(() =>
        this.type() ?? this.inputConfig()?.type ?? AlfButtonTypeEnum.Button,
    );

    public readonly iconLeftComputed = computed(() =>
        this.iconLeft() ?? this.inputConfig()?.iconLeft,
    );

    public readonly labelComputed = computed(() =>
        this.label() ?? this.inputConfig()?.label ?? this.textStyleComputed()?.default?.text ?? 'Boton',
    );

    public readonly iconRightComputed = computed(() =>
        this.iconRight() ?? this.inputConfig()?.iconRight,
    );

    public readonly linkComputed = computed(() =>
        this.link() ?? this.inputConfig()?.link,
    );

}
