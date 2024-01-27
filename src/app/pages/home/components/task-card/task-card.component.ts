import { Component, Input, ViewContainerRef } from '@angular/core';
import { Card } from '@interfaces/card/card.interface';
import { ModalService } from '@services/modal/modal.service';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

type CategoryChip =
  | 'Bug'
  | 'Melhoria'
  | 'Feature'
  | 'Sprint'
  | 'Review'
  | 'Não planejada'
  | 'Urgente'
  | 'Estória';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Card;
  open = false;

  categoryColors: { [K in CategoryChip]: string } = {
    Bug: 'bg-orange-500 text-orange-700',
    Melhoria: 'bg-blue-500 text-blue-700',
    Feature: 'bg-green-500 text-green-700',
    Sprint: 'bg-yellow-500 text-yellow-700',
    Review: 'bg-gray-500 text-gray-700',
    'Não planejada': 'bg-purple-500 text-purple-700',
    Urgente: 'bg-red-500 text-red-700',
    Estória: 'bg-brown-500 text-brown-700',
  };

  categoryOptions = [
    { label: 'Bug', value: 'Bug' },
    { label: 'Melhoria', value: 'Melhoria' },
    { label: 'Feature', value: 'Feature' },
    { label: 'Sprint', value: 'Sprint' },
    { label: 'Review', value: 'Review' },
    { label: 'Não planejada', value: 'Não planejada' },
    { label: 'Urgente', value: 'Urgente' },
    { label: 'Estória', value: 'Estória' },
  ];

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.modalService.setViewContainerRef(this.viewContainerRef);
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

  getCategoryColor(category: string): string {
    if (category in this.categoryColors) {
      return this.categoryColors[category as CategoryChip];
    }
    return 'bg-gray-500 text-gray-700';
  }
}