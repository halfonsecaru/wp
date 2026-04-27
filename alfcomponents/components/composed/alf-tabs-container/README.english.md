# AlfTabsContainerComponent

The `AlfTabsContainerComponent` is a composed component designed to manage a set of tabs. It handles the navigation headers and synchronization with projected content.

## Features
- Signal-based reactivity.
- Content projection for tab panels.
- Integrated with `AlfButtons` for navigation.
- Accessible (ARIA roles included).

## Usage

```html
<alf-tabs-container [config]="tabsConfig">
  <alf-tab [tabConfig]="tabsConfig.tab[0]">
    <p>Content for Tab 1</p>
  </alf-tab>
  <alf-tab [tabConfig]="tabsConfig.tab[1]">
    <p>Content for Tab 2</p>
  </alf-tab>
</alf-tabs-container>
```

## Configuration Interface

```typescript
export interface AlfTabsContainerInterface {
  readonly tab: AlfSingleTabInterface[];
  readonly tabsStyle?: AlfTabsStyleEnum;
}
```
