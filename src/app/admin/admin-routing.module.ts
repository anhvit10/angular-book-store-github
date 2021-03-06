import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminProductDetailComponent } from './product/admin-product-detail/admin-product-detail.component';
import { AdminProductListComponent } from './product/admin-product-list/admin-product-list.component';
import { AdminProductFormComponent } from './product/admin-product-form/admin-product-form.component';
import { AdminProductReactiveFormComponent } from './product/admin-product-reactive-form/admin-product-reactive-form.component';
import { CanDeactiveGuard } from '../shared/guard/can-deactive.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminProductListComponent
  },
  {
    path: 'product/new',
    component: AdminProductFormComponent,
    canDeactivate: [CanDeactiveGuard]
  },
  {
    path: 'product/:pid',
    component: AdminProductDetailComponent
  },
  {
    path: 'product/:pid/edit',
    component: AdminProductReactiveFormComponent,
    canDeactivate: [CanDeactiveGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
