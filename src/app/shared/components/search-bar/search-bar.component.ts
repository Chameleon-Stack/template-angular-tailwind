import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@services/auth/auth.service';
import { FilterEventService } from '@services/filter-event/filter-event.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private authService: AuthService,
    private filterEventService: FilterEventService,
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

    if (!search) {
      return this.filterEventService.emit('');
    }

    this.filterEventService.emit(search);
  }

  private isValidForm(): boolean {
    if (this.form.invalid) {
      this.toastr.error('Invalid form', 'Error');
      return false;
    }

    return true;
  }
}
