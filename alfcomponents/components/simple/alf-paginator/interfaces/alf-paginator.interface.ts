import { AlfColorEnum, AlfIconsUnicodeIconEnum, AlfPxEnum } from "@alfcomponents/enums";
import { AlfButtonInterface } from "../../alf-button/interfaces/alf-button.interface";
import { AlfBaseCommonConfigInterface } from "@alfcomponents/interfaces";

export interface AlfPaginatorInterface extends AlfBaseCommonConfigInterface {

  /** Optional ID for the pagination container */
  readonly id?: string;

  /** Total number of items to paginate */
  readonly totalItems: number;

  /** Number of items to display per page */
  readonly itemsPerPage: number;

  /** Maximum number of page links to display (e.g., 5 for [1] [2] [3] [4] [5]) */
  readonly maxSize?: number;

  /** Whether to hide the ellipsis (...) when not all pages fit in maxSize */
  readonly hideEllipsis?: boolean;

  /** Whether to show page info text (e.g., "1 of 10") */
  readonly showPageInfo?: boolean;

  /** Custom text for page info. Use {{current}} and {{total}} as placeholders */
  readonly pageInfoLabel?: string;

  /** Color for page info text */
  readonly pageInfoColor?: AlfColorEnum;

  /** Position of page info text relative to buttons ('left', 'right', 'top', 'bottom') */
  readonly pageInfoPosition?: 'left' | 'right' | 'top' | 'bottom';

  // Icons & Labels Control
  /** Whether to show First (<<) and Last (>>) buttons */
  readonly showFirstLastButtons?: boolean;

  /** Label for "First" button (defaults to icon if not provided) */
  readonly firstLabel?: string;

  /** Label for "Last" button (defaults to icon if not provided) */
  readonly lastLabel?: string;

  /** Label for "Previous" button (defaults to icon if not provided) */
  readonly prevLabel?: string;

  /** Label for "Next" button (defaults to icon if not provided) */
  readonly nextLabel?: string;

  /** Icon for "First" button */
  readonly firstIcon?: AlfIconsUnicodeIconEnum | string;

  /** Icon for "Last" button */
  readonly lastIcon?: AlfIconsUnicodeIconEnum | string;

  /** Icon for "Previous" button */
  readonly prevIcon?: AlfIconsUnicodeIconEnum | string;

  /** Icon for "Next" button */
  readonly nextIcon?: AlfIconsUnicodeIconEnum | string;

  // Button Delegation Configs
  /** Base configuration for standard numbered buttons */
  readonly buttonConfig?: Partial<AlfButtonInterface>;

  /** Configuration override for the currently active page button */
  readonly activeButtonConfig?: Partial<AlfButtonInterface>;

  /** Configuration override for navigation buttons (First, Last, Prev, Next) */
  readonly navButtonConfig?: Partial<AlfButtonInterface>;

  // Layout
  /** Horizontal alignment of the pagination */
  readonly align?: 'start' | 'center' | 'end';

  /** Gap used between buttons (CSS value) */
  readonly gap?: AlfPxEnum;

  readonly loading?: boolean;
}

/**
 * Event emitted when page changes
 */
export interface AlfPageEvent {
  page: number;
  itemsPerPage: number;
  previousPage: number;
}
