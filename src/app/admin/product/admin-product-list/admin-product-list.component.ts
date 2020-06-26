import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { products } from 'src/app/shared/mock-data/product-list';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit{

  products: Product[] = [];
  isAddNew: boolean = false;
  isAddNewReactive:boolean = false;
  selectedProduct: Product;

  constructor() { }

  ngOnInit(): void {
    this.products = products;
  }

  viewDetail(p): void {
    this.selectedProduct= p;
  }

  showAddForm(): void {
    this.isAddNew = true;
  }

  showAddReactiveForm(): void {
    this.isAddNewReactive = true;
    console.log(this.isAddNewReactive);
  }

  handleSubmitForm(product) {
    this.products.push(product);
    this.isAddNew = false;
  }

}
