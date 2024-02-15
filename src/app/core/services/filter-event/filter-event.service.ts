import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterEventService {
  private filter: Subject<string> = new Subject<string>();

  emit(value: string): void {
    this.filter.next(value);
  }

  get(): Observable<string> {
    return this.filter.asObservable();
  }
}