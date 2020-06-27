import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { publishers } from 'src/app/shared/mock-data/publisher-list';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-product-reactive-form',
  templateUrl: './admin-product-reactive-form.component.html',
  styleUrls: ['./admin-product-reactive-form.component.scss']
})
export class AdminProductReactiveFormComponent implements OnInit {
  @Input() editProduct: Product;

  publisher = [];
  subcription: Subscription;

  constructor(private receiveProduct: ProductService, private fb: FormBuilder) { }

  formProduct:  FormGroup;

  ngOnInit(): void {
    this.publisher = publishers;

    this.formProduct = this.fb.group({
      title: this.fb.control(this.editProduct.title, Validators.required),
      imageUrl: this.fb.control(this.editProduct.imageUrl, Validators.required),
      author: this.fb.control(this.editProduct.author, Validators.required),
      finalPrice: this.fb.control(this.editProduct.finalPrice, Validators.required),
      regularPrice: this.fb.control(this.editProduct.regularPrice,Validators.required),
      publisher: this.fb.control(this.editProduct.publisher,Validators.required),
      publishedDate: this.fb.control(this.editProduct.publishedDate),
      size: this.fb.control(this.editProduct.size),
      pageCount: this.fb.control(this.editProduct.pageCount),
      isTikiNow: this.fb.control(this.editProduct.isTikiNow)
    });
  }

  onSubmit(value): void {
    const product = new Product(value);
    this.receiveProduct.updateProduct(product).subscribe(result => console.log(result));
  }

}
