import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, SharedModule],
  declarations: [HeaderComponent, SidebarComponent, ContainerComponent],
  exports: [HeaderComponent, ContainerComponent],
})
export class LayoutModule {}
