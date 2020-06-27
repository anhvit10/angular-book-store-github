import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  @Input() publishers;
  @Output() submitForm = new EventEmitter();

  subcription: Subscription;

  constructor(private receiveProduct: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit(value: Product){
    const product = new Product(value);
    this.subcription = this.receiveProduct.createProduct(product).subscribe(result => console.log(result));
    // this.receiveProduct.createProduct(value);
  }

}
