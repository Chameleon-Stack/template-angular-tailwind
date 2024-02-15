import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryEventService {
  private categoryChangeSource = new Subject<void>();

  emit() {
    this.categoryChangeSource.next();
  }

  get(): Observable<void> {
    return this.categoryChangeSource.asObservable();
  }
}
