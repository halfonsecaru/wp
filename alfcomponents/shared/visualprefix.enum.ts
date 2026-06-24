export enum visualprefixEnum {

    // Switch
    SwitchPrefix = 'alf-sw',
    SwitchClass= 'alf-switch',
    Switch = `--${visualprefixEnum.SwitchPrefix}`,

    // Radios
    RadioClass = 'alf-rb',
    Radio = 'alf-radio-button',
    RadioButton = `--${visualprefixEnum.RadioClass}`,

    // Autocomplete
    AutocompletePrefix = 'alf-ac',
    AutocompleteClass = 'alf-autocomplete',
    Autocomplete = `--${visualprefixEnum.AutocompletePrefix}`,

    // Autocomplete
    AutocompletePanelPrefix = 'alf-ac-p',
    AutocompletePanelClass = 'alf-autocomplete-panel',
    AutocompletePanel = `--${visualprefixEnum.AutocompletePrefix}`,

    // Cards
    CardPrefix = 'alf-card',
    CardClass = 'alf-cards',
    Card = `--${visualprefixEnum.CardPrefix}`,

    CardTitle = '--alf-card-title',
    CardBody = '--alf-card-body',
    CardImg = '--alf-card-img',
    CardActions = '--alf-card-actions',

    // Componentes
    Buttons = '--alf-btn',
    TabsContainer = '--alf-tabs',
    TabsContent = '--alf-tab-content',
    TabsNavigation = '--alf-tabs-navigation',
    TabsSlider = '--alf-tabs-slider',
    CheckPrefix = 'alf-cb',
    Checkbox = '--alf-cb',
    Input = '--alf-inp',

    
    
    // InternalIds
    ButtonsInternalId = '-alf-btn-id',
    
    
    // Directivas
    Button = 'alf-button',
    Ripple = '--alf-ripple',
    Tooltip = '--alf-tooltip',
    Loading = '--alf-loading',
    Popover = '--alf-popover',
    Check = 'alf-checkbox',
    Inputt = 'alf-input',


    TabsContainerInternalId = "--alf-tabs-id",
    CardInternalId = '--alf-card-id'
}