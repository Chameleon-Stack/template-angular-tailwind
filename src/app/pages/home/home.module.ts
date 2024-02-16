import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeleteTaskDialogComponent } from './components/delete-task-dialog/delete-task-dialog.component';
import { LayoutModule } from 'src/app/core/layout/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    TaskCardComponent,
    TaskDialogComponent,
    DeleteTaskDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgSelectModule,
    LayoutModule,
    SharedModule,
  ],
})
export class HomeModule {}
