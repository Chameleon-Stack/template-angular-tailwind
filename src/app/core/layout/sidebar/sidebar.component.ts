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

  constructor() {}

  ngOnInit(): void {}

  onLogout(): void {
    this.logout.emit();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
