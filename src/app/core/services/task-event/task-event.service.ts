import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskEventService {
  private taskChangeSubject = new Subject<void>();
  public taskChange$ = this.taskChangeSubject.asObservable();

  public taskChanged(): void {
    this.taskChangeSubject.next();
  }
}