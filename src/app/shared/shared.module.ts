import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { UserCardComponent } from '@components/user-card/user-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryTextColorPipe } from './pipes/category-text-color.pipe';
import { CategoryBackgroundColorPipe } from './pipes/category-background-color.pipe';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '@components/logo/logo.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    UserCardComponent,
    CategoryTextColorPipe,
    CategoryBackgroundColorPipe,
    LogoComponent
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [
    SearchBarComponent,
    UserCardComponent,
    CategoryTextColorPipe,
    CategoryBackgroundColorPipe,
    LogoComponent
  ],
})
export class SharedModule {}
