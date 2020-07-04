import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { AuthGuardGuard } from '../shared/guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'product/:pid',
    component: ProductDetailComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'shipping',
    component: ShippingFormComponent,
    canActivate: [AuthGuardGuard]

  },
  {
    path: 'checkout',
    component: CheckOutComponent,
    canActivate: [AuthGuardGuard]

  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [AuthGuardGuard]

  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuardGuard]

  },
  {
    path: 'my-favorites',
    component: MyFavoritesComponent,
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}
