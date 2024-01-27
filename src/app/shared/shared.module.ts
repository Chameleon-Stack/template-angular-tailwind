import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { UserCardComponent } from '@components/user-card/user-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterDialogComponent } from '@components/register-dialog/register-dialog.component';
import { LoginDialogComponent } from '@components/login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    LoginDialogComponent,
    RegisterDialogComponent,
    SearchBarComponent,
    UserCardComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [
    LoginDialogComponent,
    RegisterDialogComponent,
    SearchBarComponent,
    UserCardComponent,
  ],
})
export class SharedModule {}
