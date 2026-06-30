import { AlfDisplayAndLayoutInterface, AlfDisplayAndLayoutBaseInterface } from "@alfcomponents/interfaces";
import { 
  AlfAlignItemsEnum, 
  AlfDisplayEnum, 
  AlfFlexDirectionEnum, 
  AlfJustifyContentEnum, 
  AlfPercentageEnum, 
  AlfPxEnum 
} from "@alfcomponents/enums";
import { AlfComponentTypeEnum } from "../enum/AlfComponentType.enum";

const createAllStatesConfig = (baseConfig: AlfDisplayAndLayoutBaseInterface): AlfDisplayAndLayoutInterface => {
    return {
        default: baseConfig,
        hover: baseConfig,
        focus: baseConfig,
        active: baseConfig,
        disabled: baseConfig
    };
};

export const buildDisplayAndLayoutConfig = (componentType: AlfComponentTypeEnum): AlfDisplayAndLayoutInterface => {
    switch (componentType) {
        case AlfComponentTypeEnum.Tabs:
            return createAllStatesConfig({
                display: AlfDisplayEnum.Flex,
                flexDirection: AlfFlexDirectionEnum.Column,
                alignItems: AlfAlignItemsEnum.Stretch,
                justifyContent: AlfJustifyContentEnum.Start,
                width: AlfPxEnum.auto,
                height: AlfPxEnum.auto
            });
        case AlfComponentTypeEnum.Paginator:
            return createAllStatesConfig({
                display: AlfDisplayEnum.Flex,
                flexDirection: AlfFlexDirectionEnum.Row,
                alignItems: AlfAlignItemsEnum.Center,
                justifyContent: AlfJustifyContentEnum.Center,
                width: AlfPercentageEnum.Percent100,
                height: AlfPxEnum.auto
            });
        default:
            return {};
    }
};