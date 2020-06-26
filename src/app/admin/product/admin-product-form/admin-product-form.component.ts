import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { publishers } from 'src/app/shared/mock-data/publisher-list';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  @Input() publishers: any;
  @Output() submitForm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formValue: Product) {
    // console.log(formValue);
    this.submitForm.emit(formValue);
  }

}
