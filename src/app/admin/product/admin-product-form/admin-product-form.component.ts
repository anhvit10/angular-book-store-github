import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formValue: Product) {
    console.log(formValue);
    this.submitForm.emit(formValue);
  }

}
