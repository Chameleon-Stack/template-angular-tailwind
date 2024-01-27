import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginDialogComponent } from '@components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '@components/register-dialog/register-dialog.component';
import { User } from '@interfaces/user/user.interface';
import { AuthService } from '@services/auth/auth.service';
import { ModalService } from '@services/modal/modal.service';
import { UserEventService } from '@services/user-event/user-event.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public user!: User;
  public showSidebar: boolean = false;
  public showDropdown: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private userEventService: UserEventService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.modalService.setViewContainerRef(this.viewContainerRef);
    this.initializeUser();
    this.initializeLoginForm();
    this.listenUserChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public logout() {
    this.authService.logout();
    this.userEventService.changeUser(null);
    this.user = null as any;
    this.showDropdown = false;
    this.modalService.close();
    window.location.reload();
  }

  public openLoginModal() {
    this.modalService.open(LoginDialogComponent);
  }

  public openRegisterModal() {
    this.modalService.open(RegisterDialogComponent);
  }

  public toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  public toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  public editUser() {
    this.modalService.open(RegisterDialogComponent, {
      isEdit: true,
      user: this.user,
    });
  }

  private initializeUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  private initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private listenUserChanges() {
    this.userEventService
      .userChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (!user) return;
        this.user = user;
      });
  }
}
