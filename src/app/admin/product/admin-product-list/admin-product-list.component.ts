import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { publishers } from 'src/app/shared/mock-data/publisher-list';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit{

  products: Product[] = [];
  publisher: any;
  // isAddNew: boolean = false;
  // isediting: boolean = false;
  // isDetail: boolean = false;
  // selectedProduct: Product;
  // selectedPro: Product;

  constructor (
      private receiveProduct: ProductService,
      private router: Router,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.products = products;
    this.publisher = publishers;

    // this.receiveProduct.$newProduct.subscribe(formValue => {
    //   this.products.push(formValue);
    //   this.isAddNewReactive = false;
    // })

    this.receiveProduct.getProducts().subscribe(result => this.products = result);
  }

  viewProduct(p): void {
    // this.isDetail = !this.isDetail;
    // this.selectedProduct = p;
    this.router.navigate(['product', p.id], { relativeTo: this.route });
  }

  showAddForm(): void {
    // this.isAddNew = !this.isAddNew;  
    this.router.navigate(['product','new'], { relativeTo: this.route});
  }

  editProduct(product: Product) {
    // this.selectedPro = product;
    // this.isediting = !this.isediting;
    this.router.navigate(['product', product.id, 'edit'], { relativeTo: this.route });
  }

  deleteProduct(product: Product) {
    const res = confirm('Are you sure you want to delete?');
    if (res) {
      this.receiveProduct.deleteProduct(product.id).subscribe(result => console.log(result));
    }
  }

  // handleSubmitForm(product) {
  //   this.products.push(product);
  //   this.isAddNew = !this.isAddNew;
  // }

}
