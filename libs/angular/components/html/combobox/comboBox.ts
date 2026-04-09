import { Component, ChangeDetectionStrategy, ViewEncapsulation, input } from '@angular/core';
import { comboboxInterface } from './interfaces/combobox.interface';

@Component({
  selector: 'app-combobox',
  standalone: true,
  templateUrl: './comboBox.html',
  styleUrls: ['./comboBox.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ComboBoxComponent {
  option = input.required<comboboxInterface[]>();
  constructor() {}
}
