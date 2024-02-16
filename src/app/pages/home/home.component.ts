import { Component, OnInit } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { Card } from '@interfaces/card/card.interface';
import { User } from '@interfaces/user/user.interface';

import { CardService } from '@services/card/card.service';
import { ModalService } from '@services/modal/modal.service';
import { TaskEventService } from '@services/task-event/task-event.service';
import { UserEventService } from '@services/user-event/user-event.service';

import { FilterEventService } from '@services/filter-event/filter-event.service';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cards: Card[] = [];
  faCog = faCog;
  user!: User;
  categories: { label: string; value: string }[] = [];
  headers: { label: string; value: string }[] = [
    { label: 'Não iniciado', value: 'Não iniciado' },
    { label: 'Em progresso', value: 'Em progresso' },
    { label: 'Completo', value: 'Completo' },
  ];

  constructor(
    private cardService: CardService,
    private modalService: ModalService,
    private taskEventService: TaskEventService,
    private userEventService: UserEventService,
    private filterEventService: FilterEventService,
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.getCurrentUser();
    this.subscribeToEvents();
    await this.loadTasks();

    this.filterEventService.get().subscribe((value) => {
      if (this.user.id) {
        if (value) {
          this.cardService
            .get(this.user.id, { title: value })
            .subscribe((cards) => {
              this.cards = cards;
            });
        } else {
          this.loadTasks();
        }
      }
    });
  }

  // Métodos de eventos
  private subscribeToEvents(): void {
    this.taskEventService.get().subscribe(async () => {
      await this.loadTasks();
    });
    this.userEventService.get().subscribe(async () => {
      this.user = this.getCurrentUser();
      await this.loadTasks();
    });
  }

  // Métodos de carregamento
  private async loadTasks(filter?: string): Promise<void> {
    if (!this.user.id) return;
    this.cardService.get(this.user.id, { status: filter }).subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: (error) => {
        this.toastr.error(
          'Erro ao carregar tarefas' + error.error.message,
          'Erro'
        );
      },
    });
  }

  openDialog(status?: string): void {
    this.modalService.open(TaskDialogComponent, {
      isEdit: false,
      selectedStatus: status,
    });
  }

  private getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLogged(): boolean {
    return !!this.user.id;
  }

  getCardsByStatus(status: string): Card[] {
    return this.cards.filter((card) => card.status === status);
  }
}
