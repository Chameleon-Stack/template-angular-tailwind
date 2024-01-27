import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private isOpen = new BehaviorSubject<boolean>(false);

  isOpen$ = this.isOpen.asObservable();

  toggleMenu() {
    this.isOpen.next(!this.isOpen.value);
  }

  openMenu() {
    this.isOpen.next(true);
  }

  closeMenu() {
    this.isOpen.next(false);
  }
}
