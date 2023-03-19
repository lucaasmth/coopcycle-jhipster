import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentPlatform } from '../payment-platform.model';

@Component({
  selector: 'jhi-payment-platform-detail',
  templateUrl: './payment-platform-detail.component.html',
})
export class PaymentPlatformDetailComponent implements OnInit {
  paymentPlatform: IPaymentPlatform | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentPlatform }) => {
      this.paymentPlatform = paymentPlatform;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
