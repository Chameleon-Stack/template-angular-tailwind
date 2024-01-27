import { ToastrService } from 'ngx-toastr';
import { CategoryEventService } from '@services/category-event/category-event.service';
// Importações de bibliotecas externas
import { Component, OnInit } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';

// Importações de interfaces
import { Card } from '@interfaces/card/card.interface';
import { User } from '@interfaces/user/user.interface';

// Importações de serviços
import { CardService } from '@services/card/card.service';
import { CategoryService } from './../../core/services/category/category.service';
import { ModalService } from '@services/modal/modal.service';
import { TaskEventService } from '@services/task-event/task-event.service';
import { UserEventService } from '@services/user-event/user-event.service';
import { UserService } from '@services/user/user.service';

// Importações de componentes
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { LoginDialogComponent } from '@components/login-dialog/login-dialog.component';

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
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.getCurrentUser();
    this.subscribeToEvents();
    await this.loadTasks();
  }

  // Métodos de eventos
  private subscribeToEvents(): void {
    this.taskEventService.taskChange$.subscribe(async () => {
      await this.loadTasks();
    });
    this.userEventService.userChanged().subscribe(async () => {
      this.user = this.getCurrentUser();
      await this.loadTasks();
    });
  
  }

  // Métodos de carregamento
  private async loadTasks(): Promise<void> {
    if (!this.user.id) return;
    this.cardService.get(this.user.id).subscribe((cards) => {
      this.cards = cards;
    });
  }



  openDialog(status?: string): void {
    this.modalService.open(TaskDialogComponent, {
      isEdit: false,
      selectedStatus: status,
    });
  }

  openLoginModal(): void {
    this.modalService.open(LoginDialogComponent);
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
