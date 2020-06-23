import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { products } from 'src/app/shared/mock-data/product-list';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit, OnChanges {
  @Output() submitForm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: {pre, cur, next}) {
    console.log(changes);
    
  }

  onSubmit(formValue: Product) {
    this.submitForm.emit(formValue);

  }

}
