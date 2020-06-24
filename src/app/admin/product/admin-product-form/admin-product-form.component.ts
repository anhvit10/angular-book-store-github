import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { products } from 'src/app/shared/mock-data/product-list';
import { NgModel } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  // @Output() submitForm = new EventEmitter();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit(formValue: Product) {
    // this.submitForm.emit(formValue);
    this.productService.createProduct(formValue);
  }

}
