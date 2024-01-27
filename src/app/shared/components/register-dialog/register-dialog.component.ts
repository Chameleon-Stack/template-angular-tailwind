import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '@interfaces/user/user.interface';
import { ModalService } from '@services/modal/modal.service';
import { UserEventService } from '@services/user-event/user-event.service';
import { UserService } from '@services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public faTimes = faTimes;
  public isEdit = false;
  public selectedImage: string | ArrayBuffer | File | null = null;
  public hidePassword = true;
  public hideNewPassword = true;
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public selectedImageUrl: string | null = null;

  private user!: User;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private userEventService: UserEventService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.patchFormValues();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const user = this.form.value;

    if (this.selectedImage instanceof File) {
      user.photo = this.selectedImage;
    }

    if (!this.user) {
      return;
    }

    this.isEdit ? this.updateUser(user) : this.createUser(user);
  }

  public onCancel() {
    this.form.reset();
    this.modalService.close();
  }

  public onFileChangeClick(event: Event, fileInput: HTMLInputElement) {
    event.stopPropagation();
    event.preventDefault();
    fileInput.click();
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.selectedImageUrl = URL.createObjectURL(file);
    }
  }

  public removeImage() {
    this.selectedImage = null;
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.minLength(6)]],
      photo: [''],
    });
  }

  private patchFormValues() {
    const { photo, password, ...userWithoutSensitiveInfo } = this.user || {};
    this.selectedImage = photo ?? null;
    this.form.patchValue(userWithoutSensitiveInfo);
  }

  private createUser(user: User) {
    this.userService
      .create(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newUser) => {
          this.onCancel();
          this.userEventService.changeUser(newUser);
          this.toastr.success('Usuário criado com sucesso', 'Sucesso');
        },
        error: (error) => {
          this.toastr.error(
            'Erro ao criar usuário/n' + error.error.message,
            'Erro'
          );
        },
      });
  }

  private updateUser(user: User) {
    this.userService
      .update(this.user.id!, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedUser) => {
          this.onCancel();
          this.userEventService.changeUser(updatedUser);
          this.toastr.success('Usuário atualizado com sucesso', 'Sucesso');
        },
        error: (error) => {
          this.toastr.error(
            'Erro ao atualizar usuário\n' + error.error.message,
            'Erro'
          );
        },
      });
  }
}
