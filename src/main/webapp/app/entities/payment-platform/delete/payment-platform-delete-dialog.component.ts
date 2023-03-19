import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaymentPlatform } from '../payment-platform.model';
import { PaymentPlatformService } from '../service/payment-platform.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './payment-platform-delete-dialog.component.html',
})
export class PaymentPlatformDeleteDialogComponent {
  paymentPlatform?: IPaymentPlatform;

  constructor(protected paymentPlatformService: PaymentPlatformService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentPlatformService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
