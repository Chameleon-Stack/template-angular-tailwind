import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@interfaces/user/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() public user!: User;
  @Output() public onLogout = new EventEmitter<void>();
  @Output() public openModalEditProfile = new EventEmitter<void>();

  public showDropdown = false;

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  public logout(): void {
    this.onLogout.emit();
  }

  public openRegisterDialog(): void {
    this.openModalEditProfile.emit();
  }
}
