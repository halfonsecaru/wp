import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContinueBrowsingService } from './continue-browsing.service';

@Component({
  selector: 'container-objects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container-objects.component.html',
  styleUrls: ['./container-objects.component.scss'],
})
export class containerObjectsComponent {
  private router = inject(Router);
  private service = inject(ContinueBrowsingService);

  products = this.service.products;

  goToDetail(id: number) {
    this.router.navigate(['/product', id]);
  }
}
