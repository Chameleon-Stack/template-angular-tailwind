import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@interfaces/user/user.interface';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() public user!: User;

  public showDropdown = false;

  constructor(private authService: AuthService) {}

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  public logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
