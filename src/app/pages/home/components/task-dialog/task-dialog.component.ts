import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';

import { Card } from '@interfaces/card/card.interface';
import { Category } from '@interfaces/category/category.interface';
import { User } from '@interfaces/user/user.interface';

import { AuthService } from '@services/auth/auth.service';
import { CardService } from '@services/card/card.service';
import { ModalService } from '@services/modal/modal.service';
import { TaskEventService } from '@services/task-event/task-event.service';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  @Input() task!: Card;
  @Input() isEdit!: boolean;

  form!: FormGroup;
  user!: User;
  categories: Category[] = [];
  statusOptions: { label: string; value: string }[] = [
    { label: 'Não iniciado', value: 'Não iniciado' },
    { label: 'Em progresso', value: 'Em progresso' },
    { label: 'Completo', value: 'Completo' },
  ];
  faTimes = faTimes;
  categoriesOptions: { label: string; value: string }[] = [];
  selectedStatus: string = '';

  categoryColors: { [K in CategoryChip]: string } = {
    Bug: 'bg-orange-300 text-orange-700',
    Melhoria: 'bg-blue-300 text-blue-700',
    Feature: 'bg-green-300 text-green-700',
    Sprint: 'bg-yellow-300 text-yellow-700',
    Review: 'bg-gray-300 text-gray-700',
    'Não planejada': 'bg-purple-300 text-purple-700',
    Urgente: 'bg-red-300 text-red-700',
    Estória: 'bg-brown-300 text-brown-700',
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
    private authService: AuthService,
    private cardService: CardService,
    private taskEventService: TaskEventService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      user_id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      categories: [[]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.getCurrentUser();
    this.updateFormValues();
  }

  private updateFormValues(): void {
    const { user_id, title, description, status } = this.task || {};
    this.form.patchValue({
      user_id: user_id ?? this.user.id ?? '',
      title: title ?? '',
      description: description ?? '',
      status: status ?? 'Não iniciado',
    });
  }

  private async getCurrentUser(): Promise<User> {
    const user = await firstValueFrom(this.authService.getCurrentUser());
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Erro ao criar tarefa', 'Erro');
      return;
    }

    this.isEdit ? this.updateTask() : this.createTask();
  }

  createTask(): void {
    if (!this.user.id) {
      this.toastr.error(
        'Erro ao criar tarefa\n' + 'Usuário não encontrado',
        'Erro'
      );
      return;
    }
    this.cardService.create(this.user.id!, this.form.value).subscribe({
      next: () => {
        this.modalService.close();
        this.toastr.success('Tarefa criada com sucesso');
        this.taskEventService.taskChanged();
      },
      error: (err) => {
        this.toastr.error('Erro ao criar tarefa\n' + err.error.message, 'Erro');
      },
    });
  }

  updateTask(): void {
    this.cardService.update(this.task?.id ?? '', this.form.value).subscribe({
      next: () => {
        this.modalService.close();
        this.toastr.success('Tarefa atualizada com sucesso');
        this.taskEventService.taskChanged();
      },
      error: (err) => {
        this.toastr.error(
          'Erro ao atualizar tarefa/n' + err.error.message,
          'Erro'
        );
      },
    });
  }

  onCancel(): void {
    this.modalService.close();
    this.taskEventService.taskChanged();
  }

  getCategoryColor(category: string): string {
    if (category in this.categoryColors) {
      return this.categoryColors[category as CategoryChip];
    }
    return 'bg-gray-500 text-gray-700';
  }
}
