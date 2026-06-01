import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlfAutocompleteComponent } from '@alfcomponents/components';

@Component({
  selector: 'app-alf-autocomplete-viewer',
  standalone: true,
  imports: [AlfAutocompleteComponent],
  templateUrl: './alf-autocomplete-viewer.html',
  styleUrl: './alf-autocomplete-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfAutocompleteViewer {}
