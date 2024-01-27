import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../core/services/auth/auth.service';
import { CardService } from './../../../core/services/card/card.service';
import { User } from '@interfaces/user/user.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private authService: AuthService,
    private cardService: CardService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      search: [''],
    });
  }

  ngOnInit(): void {}

  search() {
    if (!this.isValidForm()) {
      return;
    }

    const search = this.form.value.search;

    this.authService.getCurrentUser().subscribe((user) => {
      if (!this.isValidUser(user)) {
        return;
      }

      this.searchCards(user!, search);
    });
  }

  private isValidForm(): boolean {
    if (this.form.invalid) {
      this.toastr.error('Entre com um valor válido', 'Erro');
      return false;
    }

    if (this.form.value.search === undefined) {
      this.toastr.error('Entre com um valor válido', 'Erro');
      return false;
    }

    return true;
  }

  private isValidUser(user: User | null): boolean {
    if (user === null) {
      this.toastr.error('O usuário não foi encontrado', 'Erro');
      return false;
    }

    if (!user.id) {
      this.toastr.error('O id do usuário não foi encontrado', 'Erro');
      return false;
    }

    return true;
  }

  private searchCards(user: User, search: string) {
    this.cardService.get(user.id!, { title: search }).subscribe((cards) => {
      console.log(cards);
    });
  }
}