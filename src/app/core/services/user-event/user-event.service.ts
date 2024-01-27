import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { User } from '@interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserEventService {
  private userChangeSubject = new Subject<User | null>();

  public userChanged(): Observable<User | null> {
    return this.userChangeSubject.asObservable();
  }

  public changeUser(user: User | null): void {
    this.userChangeSubject.next(user);
  }
}
