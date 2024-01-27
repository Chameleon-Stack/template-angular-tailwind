import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryEventService {
  private categoryChangeSource = new Subject<void>();
  categoryChange$ = this.categoryChangeSource.asObservable();

  categoryChanged() {
    this.categoryChangeSource.next();
  }
}