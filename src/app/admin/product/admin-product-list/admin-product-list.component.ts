import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { products } from 'src/app/shared/mock-data/product-list';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';
import { publishers } from 'src/app/shared/mock-data/publisher-list';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit{

  products: Product[] = [];
  publisher;
  isAddNew: boolean = false;
  isAddNewReactive:boolean = false;
  selectedProduct: Product;

  constructor(private receiveProduct: ProductService) { }

  ngOnInit(): void {
    this.products = products;
    this.publisher = publishers;
    this.receiveProduct.$newProduct.subscribe(formValue => {
      this.products.push(formValue);
      this.isAddNewReactive = false;
    })
  }

  viewDetail(p): void {
    this.selectedProduct = p;
  }

  showAddForm(): void {
    this.isAddNew = !this.isAddNew;
  }

  showAddReactiveForm(): void {
    this.isAddNewReactive = !this.isAddNewReactive;
  }

  handleSubmitForm(product) {
    this.products.push(product);
    this.isAddNew = false;
  }

}
