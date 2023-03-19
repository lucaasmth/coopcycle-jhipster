import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentPlatformComponent } from './list/payment-platform.component';
import { PaymentPlatformDetailComponent } from './detail/payment-platform-detail.component';
import { PaymentPlatformUpdateComponent } from './update/payment-platform-update.component';
import { PaymentPlatformDeleteDialogComponent } from './delete/payment-platform-delete-dialog.component';
import { PaymentPlatformRoutingModule } from './route/payment-platform-routing.module';

@NgModule({
  imports: [SharedModule, PaymentPlatformRoutingModule],
  declarations: [
    PaymentPlatformComponent,
    PaymentPlatformDetailComponent,
    PaymentPlatformUpdateComponent,
    PaymentPlatformDeleteDialogComponent,
  ],
})
export class PaymentPlatformModule {}
