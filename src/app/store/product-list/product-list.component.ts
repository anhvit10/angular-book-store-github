import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Product } from 'src/app/shared/models/product';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // @Output() selectProduct = new EventEmitter<string>();

  products = [];
  publishers: string[];
  authors: string[];
  originProducts = [];
  private unsubscribeAll: Subject<any>;


  constructor ( 
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // this.products = products;

    this.productService.getProducts().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(result => {
      this.products = result;
      // this.isFetchData = false;
      this.setFilters();
    });
  }

  setFilters() {
    const publishersObj = {};
    const authorsObj = {};
    this.products.forEach(ele => {
      publishersObj[ele.publisher] = ele.publisher;
      authorsObj[ele.author] = ele.author;
    });
    this.publishers = Object.keys(publishersObj);
    this.authors = Object.keys(authorsObj);
  }

  trackByFn(index, item) {
    return item.id;
  }

  onSelectedProduct(productId): void {
    // this.selectProduct.emit(productId);
    // this.storeService.setSelectedProductId(productId);
    this.router.navigate(['product', productId], { relativeTo: this.route});
  }

  search(searchValue): void {
    const lsSearchValue = searchValue.toLocaleLowerCase();
    if(searchValue != null){
      this.products = this.products.filter(
        ele => ele.title.toLocaleLowerCase().includes(lsSearchValue)
        || ele.author.toLocaleLowerCase().includes(lsSearchValue)
      );
    }else {
        this.productService.getProducts().pipe(
          takeUntil(this.unsubscribeAll)
        ).subscribe(result => {
          this.products = result;
          // this.isFetchData = false;
          // this.setFilters();
        });
    }
  }

}
