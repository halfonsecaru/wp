import { AlfDisplayAndLayoutInterface } from "@alfcomponents/interfaces";
import { AlfPxEnum } from "@alfcomponents/enums";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

export const buildDisplayAndLayoutConfig = (componentType: AlfComponentTypeEnum): AlfDisplayAndLayoutInterface => {
    if (componentType === AlfComponentTypeEnum.Tabs) {
        return {
            default: {
                display: 'flex' as any,
                flexDirection: 'column' as any,
                alignItems: 'stretch' as any,
                justifyContent: 'flex-start' as any,
                width: AlfPxEnum.auto,
                height: AlfPxEnum.auto
            }
        };
    }
    return {};
};