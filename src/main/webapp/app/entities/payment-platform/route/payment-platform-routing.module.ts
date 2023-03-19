import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PaymentPlatformComponent } from '../list/payment-platform.component';
import { PaymentPlatformDetailComponent } from '../detail/payment-platform-detail.component';
import { PaymentPlatformUpdateComponent } from '../update/payment-platform-update.component';
import { PaymentPlatformRoutingResolveService } from './payment-platform-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const paymentPlatformRoute: Routes = [
  {
    path: '',
    component: PaymentPlatformComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaymentPlatformDetailComponent,
    resolve: {
      paymentPlatform: PaymentPlatformRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaymentPlatformUpdateComponent,
    resolve: {
      paymentPlatform: PaymentPlatformRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaymentPlatformUpdateComponent,
    resolve: {
      paymentPlatform: PaymentPlatformRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(paymentPlatformRoute)],
  exports: [RouterModule],
})
export class PaymentPlatformRoutingModule {}
