import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContinueBrowsingService {
  // Aquí iría la llamada HTTP al backend en el futuro
  // this.http.get<Product[]>('/api/continue-browsing')
  products = signal([
    {
      id: 1,
      imageUrl:
        'https://m.media-amazon.com/images/I/81kFQOSp2-L._AC_SL1500_.jpg',
    },
    {
      id: 2,
      imageUrl:
        'https://m.media-amazon.com/images/I/71Q9d6N7xkL._AC_SL1500_.jpg',
    },
    {
      id: 3,
      imageUrl:
        'https://m.media-amazon.com/images/I/81QFQOSp2-L._AC_SL1500_.jpg',
    },
    {
      id: 4,
      imageUrl:
        'https://m.media-amazon.com/images/I/81kFQOSp2-L._AC_SL1500_.jpg',
    },
  ]);
}
