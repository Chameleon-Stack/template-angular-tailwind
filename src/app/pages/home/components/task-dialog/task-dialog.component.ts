import { CategoryService } from '@services/category/category.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, catchError, firstValueFrom, of, tap } from 'rxjs';

import { Card } from '@interfaces/card/card.interface';
import { Category } from '@interfaces/category/category.interface';
import { User } from '@interfaces/user/user.interface';

import { AuthService } from '@services/auth/auth.service';
import { CardService } from '@services/card/card.service';
import { ModalService } from '@services/modal/modal.service';
import { TaskEventService } from '@services/task-event/task-event.service';
import { ToastrService } from 'ngx-toastr';
import { IOption } from '@interfaces/ioption/IOption.interface';

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
  statusOptions: IOption[] = [
    { label: 'Não iniciado', value: 'Não iniciado' },
    { label: 'Em progresso', value: 'Em progresso' },
    { label: 'Completo', value: 'Completo' },
  ];
  faTimes = faTimes;
  selectedStatus: string = '';
  categoriesOptions: IOption[] = [];

  constructor(
    private authService: AuthService,
    private cardService: CardService,
    private categoryService: CategoryService,
    private taskEventService: TaskEventService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      user_id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      categories: [[]],
      category_ids: [[]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.getCurrentUser();
    await this.categoryService.get(this.user.id).subscribe((categories) => {
      this.categories = categories;
      this.categoriesOptions = categories.map((category) => ({
        label: category.name,
        value: category.id!,
      }));
    });
    this.updateFormValues();
  }

  private updateFormValues(): void {
    if (this.isEdit) {
      this.form.get('category_ids')?.setValidators(Validators.required);
    }

    if (this.task) {
      this.form.patchValue({
        user_id: this.task.user_id,
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        categories: this.task.categories
          ? this.task.categories.map((category) => category.name)
          : [],
        category_ids: this.task.categories
          ? this.task.categories.map((category) => category.id)
          : [],
      });
    } else {
      this.form.patchValue({
        user_id: this.user.id,
        status: this.selectedStatus || '',
      });
    }
  }

  private async getCurrentUser(): Promise<User> {
    const user = await firstValueFrom(this.authService.getCurrentUser());
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Preencha todos os campos', 'Erro');
      return;
    }

    const action = this.isEdit ? this.updateTask() : this.createTask();

    action
      .pipe(
        tap((res) => {
          this.taskEventService.emit();
          const message = this.isEdit
            ? 'Tarefa atualizada com sucesso!'
            : 'Tarefa criada com sucesso!';
          this.toastr.success(message, 'Sucesso');
          this.modalService.close();
        }),
        catchError((err) => {
          this.toastr.error(
            `Erro ao ${this.isEdit ? 'atualizar' : 'criar'} tarefa\n${
              err.error.message
            }`,
            'Erro'
          );
          return of(null);
        })
      )
      .subscribe();
  }

  createTask(): Observable<any> {
    if (!this.user.id) {
      this.toastr.error(
        'Erro ao criar tarefa\n' + 'Usuário não encontrado',
        'Erro'
      );
      return of(null);
    }
    return this.cardService.create(this.user.id!, this.form.value);
  }

  updateTask(): Observable<any> {
    const { categories, ...task } = this.form.value;
    return this.cardService.update(this.task?.id, task);
  }

  onCancel(): void {
    this.modalService.close();
    this.taskEventService.emit();
  }

  public toggleCategory(category: IOption): void {
    const categories = this.form.get('categories')?.value || [];
    const category_ids = this.form.get('category_ids')?.value || [];

    const categoryIndex = categories.indexOf(category.label);

    if (categoryIndex > -1) {
      categories.splice(categoryIndex, 1);
      category_ids.splice(categoryIndex, 1);
    } else {
      categories.push(category.label);
      category_ids.push(category.value);
    }

    this.form.patchValue({
      categories: categories,
      category_ids: category_ids,
    });
  }

  isSelected(category: string): boolean {
    return this.form.get('categories')?.value.includes(category);
  }
}
