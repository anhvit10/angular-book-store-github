import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

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
    this.submitForm.emit(formValue);
  }

}
