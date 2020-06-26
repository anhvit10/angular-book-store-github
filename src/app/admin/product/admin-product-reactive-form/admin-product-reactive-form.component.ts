import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-admin-product-reactive-form',
  templateUrl: './admin-product-reactive-form.component.html',
  styleUrls: ['./admin-product-reactive-form.component.scss']
})
export class AdminProductReactiveFormComponent implements OnInit {
  
  constructor(private receiveProduct: ProductService,private fb: FormBuilder) { }

  formProduct:  FormGroup;

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      title: this.fb.control('', Validators.required),
      imageUrl: this.fb.control('', Validators.required),
      author: this.fb.control('', Validators.required),
      finalPrice: this.fb.control('', Validators.required),
      regularPrice: this.fb.control('',Validators.required),
      publisher: this.fb.control('',Validators.required),
      publishedDate: this.fb.control(''),
      size: this.fb.control(''),
      pageCount: this.fb.control(''),
      isTikiNow: this.fb.control('')
    });
  }

  onSubmit(value: Product){
    this.receiveProduct.createProduct(value);
  }

}
