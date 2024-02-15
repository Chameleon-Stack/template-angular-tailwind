import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskEventService {
  private taskChangeSubject = new Subject<void>();

  public emit(): void {
    this.taskChangeSubject.next();
  }

  public get(): Observable<void> {
    return this.taskChangeSubject.asObservable();
  }
}
