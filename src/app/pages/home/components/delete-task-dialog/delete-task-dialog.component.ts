import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@interfaces/card/card.interface';
import { CardService } from '@services/card/card.service';
import { ModalService } from '@services/modal/modal.service';
import { TaskEventService } from '@services/task-event/task-event.service';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.scss'],
})
export class DeleteTaskDialogComponent implements OnInit {
  @Input() task!: Card;
  faTimes = faTimes;

  constructor(
    private cardService: CardService,
    private modalService: ModalService,
    private taskEventService: TaskEventService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onCancel() {
    this.modalService.close();
  }

  deleteTask(task: Card = this.task) {
    if (!task.id) {
      this.toastr.error(
        'Erro ao excluir a tarefa\n' + 'ID não encontrado',
        'Erro'
      );
      return;
    }

    this.cardService.delete(task.id!).subscribe({
      next: (res) => {
        this.modalService.close();
        this.taskEventService.emit();
        this.toastr.success('Tarefa excluída com sucesso', 'Sucesso');
      },
      error: (error) => {
        this.toastr.error(
          'Erro ao excluir a tarefa\n' + error.error.message,
          'Erro'
        );
      },
    });
  }
}
