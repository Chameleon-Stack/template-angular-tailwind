import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalService } from '@services/modal/modal.service';
import { UserEventService } from '@services/user-event/user-event.service';
import { AuthService } from '@services/auth/auth.service';
import { Session } from '@interfaces/session/session.interface';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public faTimes = faTimes;
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public hide = true;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userEventService: UserEventService,
    private modalService: ModalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit() {
    if (this.form.valid) {
      this.authService
        .login(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (session) => this.handleSuccessfulLogin(session),
          error: () => this.handleLoginError(),
        });
    }
  }

  public onCancel() {
    this.form.reset();
    this.modalService.close();
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private handleSuccessfulLogin(session: Session) {
    localStorage.setItem('token', session.token);
    localStorage.setItem('user', JSON.stringify(session.user));
    this.userEventService.changeUser(session.user);
    this.onCancel();
    this.toastrService.success('Login realizado com sucesso', 'Sucesso');
  }

  private handleLoginError(error?: any) {
    this.toastrService.error(
      'Erro ao realizar login\n' + error?.error?.message,
      'Erro'
    );
  }
}
