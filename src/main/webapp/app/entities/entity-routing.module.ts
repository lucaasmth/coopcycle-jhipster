import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        data: { pageTitle: 'coopcycleApp.client.home.title' },
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
      },
      {
        path: 'restaurant',
        data: { pageTitle: 'coopcycleApp.restaurant.home.title' },
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
      },
      {
        path: 'courier',
        data: { pageTitle: 'coopcycleApp.courier.home.title' },
        loadChildren: () => import('./courier/courier.module').then(m => m.CourierModule),
      },
      {
        path: 'order',
        data: { pageTitle: 'coopcycleApp.order.home.title' },
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
      },
      {
        path: 'payment-platform',
        data: { pageTitle: 'coopcycleApp.paymentPlatform.home.title' },
        loadChildren: () => import('./payment-platform/payment-platform.module').then(m => m.PaymentPlatformModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
