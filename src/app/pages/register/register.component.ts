import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { User } from '@interfaces/user/user.interface';
import { CategoryService } from '@services/category/category.service';
import { UserEventService } from '@services/user-event/user-event.service';
import { UserService } from '@services/user/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public selectedImageUrl: string | ArrayBuffer =
    'assets/images/default-user.jpeg';
  public selectedImageFile!: File;
  public hidePassword = true;
  public hideNewPassword = true;
  public user: User | null = null;

  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userEventService: UserEventService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: [''],
      photo: [''],
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : null;
    if (this.user) {
      this.user.photo ? (this.selectedImageUrl = this.user.photo as string) : null;
      this.form.patchValue({
        name: this.user.name,
        email: this.user.email,
        photo: this.user.photo,
      });
      this.form
        .get('new_password')
        ?.setValidators([Validators.required, Validators.minLength(6)]);
      this.form.get('new_password')?.updateValueAndValidity();
    }
  }

  public async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('password', this.form.get('password')?.value);
    formData.append('new_password', this.form.get('new_password')?.value);
    formData.append('photo', this.selectedImageFile);

    if (this.user) {
      await this.updateUser(this.user.id, formData);
    } else {
      await this.createUser(formData);
    }
  }

  private async createUser(formData: FormData) {
    try {
      const user = await firstValueFrom(this.userService.create(formData));

      this.toastr.success('Usuário criado com sucesso!', 'Sucesso');
      await this.createDefaultCategories(user.id);
    } catch (error: any) {
      this.toastr.error('Erro ao criar usuário: ' + error.message, 'Erro');
    }
  }

  private async createDefaultCategories(userId: string) {
    const defaultCategory = [
      {
        name: 'Bug',
        color: '#f97316',
      },
      {
        name: 'Melhoria',
        color: '#3b82f6',
      },
      {
        name: 'Feature',
        color: '#10b981',
      },
      {
        name: 'Sprint',
        color: '#eab308',
      },
      {
        name: 'Review',
        color: '#6b7280',
      },
      {
        name: 'Não planejada',
        color: '#8b5cf6',
      },
      {
        name: 'Urgente',
        color: '#ef4444',
      },
      {
        name: 'Estória',
        color: '#a25b5b',
      },
    ];

    const promises = defaultCategory.map((category) =>
      firstValueFrom(this.categoryService.create(userId, category))
    );

    for (const promise of promises) {
      try {
        await promise;
      } catch (error: any) {
        this.toastr.error('Erro ao criar categoria: ' + error.message, 'Erro');
      }
    }
  }

  private async updateUser(id: string, formData: FormData) {
    try {
      const userPromise = this.userService.update(id, formData);
      const user = await firstValueFrom(userPromise);
      this.toastr.success('Usuário atualizado com sucesso!', 'Sucesso');
      localStorage.setItem('user', JSON.stringify(user));
      this.userEventService.emit(user);
    } catch (error: any) {
      this.toastr.error('Erro ao atualizar usuário: ' + error.message, 'Erro');
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result !== null) {
          this.selectedImageUrl = e.target!.result as string | ArrayBuffer;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChangeClick(event: MouseEvent, fileInput: HTMLElement): void {
    event.preventDefault();
    fileInput.click();
  }
}
