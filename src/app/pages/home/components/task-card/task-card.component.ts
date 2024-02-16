import { AuthService } from '@services/auth/auth.service';
import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Card } from '@interfaces/card/card.interface';
import { ModalService } from '@services/modal/modal.service';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { User } from '@interfaces/user/user.interface';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Card;
  open = false;
  public user!: User;

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.modalService.setViewContainerRef(this.viewContainerRef);
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) this.user = user;
    });
  }

  openTaskDialog() {
    this.modalService.open(TaskDialogComponent, {
      task: this.task,
    });
  }

  editTask() {
    this.modalService.open(TaskDialogComponent, {
      task: this.task,
      isEdit: true,
    });
  }

  deleteTask() {
    this.modalService.open(DeleteTaskDialogComponent, {
      task: this.task,
    });
  }

  toggleOpen(event: Event) {
    event.stopPropagation();
    this.open = !this.open;
  }

  closeMenu(event: Event) {
    this.open = false;
  }

  // Funções auxiliares
  isArray(val: any): boolean {
    return Array.isArray(val);
  }
}
