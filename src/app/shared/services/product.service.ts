import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { products } from '../mock-data/product-list';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private newProduct = new Subject<Product>();
  $newProduct = this.newProduct.asObservable();

  constructor(private http: HttpClient) { }

  createProduct(product: Product) {
    this.newProduct.next(product);
    // return this.http.post('https://book-store-345fe.firebaseio.com/product.json', {product});
  }

  // getProducts() {
  //   return this.http.get('https://book-store-345fe.firebaseio.com/product.json').pipe(
  //     map(data => {
  //       const products: Product[] = [];
  //       for(const key in products){
  //         if(data.hasOwnProperty(key)) {
  //           products.push(new Product)
  //         }
  //       }
  //     })
  //   )
  // }

}

