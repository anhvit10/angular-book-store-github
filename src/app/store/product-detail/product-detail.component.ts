import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { products } from 'src/app/shared/mock-data/product-list';
import { Product } from 'src/app/shared/models/product';
import { StoreService } from '../services/store.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Input() productId: string;

  product: Product;

  constructor(
    private storeService: StoreService, 
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnChanges(productId: {previousValue, currentValue, firstChange}) {
    this.product = products.find(ele => ele.id === this.productId);
  }

  ngOnInit(): void {
    this.productService.getProductById(this.route.snapshot.paramMap.get('pid'))
    .subscribe(product => this.product = product);

    this.storeService.selectedProductId$.subscribe(pid => {
      this.product = products.find(ele => ele.id === pid);
    });
  }

  handleChangedQuantity(quantity) {
    console.log(quantity);
  }

}
