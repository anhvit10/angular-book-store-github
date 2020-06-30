import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { publishers } from 'src/app/shared/mock-data/publisher-list';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  // @Output() submitForm = new EventEmitter();
  @ViewChild('form') form: NgForm;

  publishers = [];  
  subcription: Subscription;

  constructor (
    private receiveProduct: ProductService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.publishers = publishers;
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  onSubmit(newProducts){
    // const product = new Product(value);
    // this.subcription = this.receiveProduct.createProduct(product).subscribe(result => console.log(result));

    // this.receiveProduct.createProduct(value);

    const product = new Product(newProducts.value);
    this.subcription = this.receiveProduct.createProduct(product)
      .subscribe(result => this.router.navigateByUrl('/admin'), err => alert(err.message));
  }

  canDeactivate() {
    if (this.form.dirty) {
      const res = confirm('are you sure?')
      return res;
    }
    return true;
  }

  cancel() {
    this.location.back();
  }

}
