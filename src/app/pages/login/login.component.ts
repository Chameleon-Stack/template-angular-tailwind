import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { UserEventService } from '@services/user-event/user-event.service';
import { UserService } from '@services/user/user.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public hide = true;
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private userEventService: UserEventService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/']);
      return;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: session => this.handleSuccessfulLogin(session),
        error: () => this.toastr.error('Falha no login. Por favor, tente novamente.')
      });
    }
  }

  private handleSuccessfulLogin(session: any) {
    localStorage.setItem('token', session.token);
    if (session.user.photo) {
      session.user.photo = this.userService.getPhotoUrl(session.user.photo);
    }
    const user = JSON.stringify(session.user);
    localStorage.setItem('user', user);
    this.userEventService.emit(session.user);
    this.router.navigate(['/']);
  }
}
