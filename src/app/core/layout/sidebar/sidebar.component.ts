import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@interfaces/user/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() user: User | undefined;
  @Output() logout = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() showSidebar: boolean = false;

  @Output() openLoginModal = new EventEmitter<void>();
  @Output() openRegisterModal = new EventEmitter<void>();
  @Output() openEditProfileModal = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onLogout(): void {
    this.logout.emit();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onOpenLoginModal(): void {
    this.openLoginModal.emit();
  }

  onOpenRegisterModal(): void {
    this.openRegisterModal.emit();
  }

  onOpenEditProfileModal(): void {
    this.openEditProfileModal.emit();
  }
}
