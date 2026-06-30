import { AlfPxEnum } from "@alfcomponents/enums";
import { AlfPaddingBaseInterface, AlfPaddingInterface } from "@alfcomponents/interfaces";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";
import { AlfInputAppearanceEnum } from "@alfcomponents/enums";

const basePadding: AlfPaddingBaseInterface = {
    paddingTop: AlfPxEnum.None,
    paddingBottom: AlfPxEnum.None,
    paddingLeft: AlfPxEnum.None,
    paddingRight: AlfPxEnum.None
};

const config = (paddingTop: AlfPxEnum, paddingBottom: AlfPxEnum, paddingLeft: AlfPxEnum, paddingRight: AlfPxEnum) => {
    return {
        default: {
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight
        },
        hover: {
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight
        },
        focus: {
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight
        },
        active: {
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight
        },
        disabled: {
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight
        }
    };

}

export const buildPaddingConfig = (
    componentType: AlfComponentTypeEnum,
    appearance: AlfInputAppearanceEnum = AlfInputAppearanceEnum.Standard
): AlfPaddingInterface => {

        switch (componentType) {
            case AlfComponentTypeEnum.Input:

                if(appearance === AlfInputAppearanceEnum.Standard){
                    return config(AlfPxEnum.Px1, AlfPxEnum.Px1, AlfPxEnum.Px10, AlfPxEnum.Px10);
                }

                return config(AlfPxEnum.Px8, AlfPxEnum.Px8, AlfPxEnum.Px12, AlfPxEnum.Px12);

            case AlfComponentTypeEnum.Button:
            case AlfComponentTypeEnum.Paginator:
                return config(AlfPxEnum.Px5, AlfPxEnum.Px5, AlfPxEnum.Px10, AlfPxEnum.Px10);

            case AlfComponentTypeEnum.CardTitle:
            case AlfComponentTypeEnum.CardBody:
            case AlfComponentTypeEnum.CardActions:
            case AlfComponentTypeEnum.CardHeader:
            case AlfComponentTypeEnum.CardFooter:
            case AlfComponentTypeEnum.CardImage:
                return config(AlfPxEnum.Px5, AlfPxEnum.Px5, AlfPxEnum.Px5, AlfPxEnum.Px5);

            default:
                return config(AlfPxEnum.None,AlfPxEnum.None,AlfPxEnum.None,AlfPxEnum.None)
        }

    };

