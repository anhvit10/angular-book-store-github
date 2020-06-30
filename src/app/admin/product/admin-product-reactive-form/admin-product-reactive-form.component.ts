import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { publishers } from 'src/app/shared/mock-data/publisher-list';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-product-reactive-form',
  templateUrl: './admin-product-reactive-form.component.html',
  styleUrls: ['./admin-product-reactive-form.component.scss']
})
export class AdminProductReactiveFormComponent implements OnInit {
  // @Input() editProduct: Product;

  subcription: Subscription;
  unsubscribeAll: Subject<any>;
  publisher = [];

  constructor (
    private receiveProduct: ProductService, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) { }

  formProduct: FormGroup;

  ngOnInit(): void {
    this.unsubscribeAll = new Subject();
    this.publisher = publishers;
    this.route.params.pipe(
      takeUntil(this.unsubscribeAll),
      map(params => params.pid),
      switchMap(pid => this.receiveProduct.getProductById(pid))
    ).subscribe(product => {
      // this.isLoading = false;
      this.createReactiveForm(product);
    });
  }

  createReactiveForm(product) {
    this.formProduct = this.fb.group({
      id: this.fb.control(product.id),
      title: this.fb.control(product.title, Validators.required),
      imageUrl: this.fb.control(product.imageUrl, Validators.required),
      author: this.fb.control(product.author, Validators.required),
      finalPrice: this.fb.control(product.finalPrice, Validators.required),
      regularPrice: this.fb.control(product.regularPrice,Validators.required),
      publisher: this.fb.control(product.publisher,Validators.required),
      publishedDate: this.fb.control(product.publishedDate),
      size: this.fb.control(product.size),
      pageCount: this.fb.control(product.pageCount),
      isTikiNow: this.fb.control(product.isTikiNow)
    });
  }

  onSubmit(value): void {
    // const product = new Product(value);
    // this.receiveProduct.updateProduct(product).subscribe(result => console.log(result));
    const product = new Product(value);
    this.receiveProduct.updateProduct(product).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(result => this.router.navigateByUrl('/admin'));
  }

  canDeactivate() {
    if (this.formProduct.dirty) {
      const res = confirm('are you sure?')
      return res;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  cancel() {
    this.location.back();
  }

}
