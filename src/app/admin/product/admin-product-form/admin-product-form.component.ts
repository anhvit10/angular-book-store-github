import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { products } from 'src/app/shared/mock-data/product-list';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  @Input() isAdd : boolean;

  products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formValue: Product) {
    products.push(formValue);
    this.isAdd = false;
  }

}
