import { Injectable, signal } from '@angular/core';

@Injectable()
export class AlfTabsHeightService {
  public readonly heightChangeSignal = signal<number>(0);

  public notifyHeightChange(): void {
    this.heightChangeSignal.update(v => v + 1);
  }
}
