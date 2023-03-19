import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PaymentPlatformFormService, PaymentPlatformFormGroup } from './payment-platform-form.service';
import { IPaymentPlatform } from '../payment-platform.model';
import { PaymentPlatformService } from '../service/payment-platform.service';
import { IOrder } from 'app/entities/order/order.model';
import { OrderService } from 'app/entities/order/service/order.service';
import { PaymentType } from 'app/entities/enumerations/payment-type.model';

@Component({
  selector: 'jhi-payment-platform-update',
  templateUrl: './payment-platform-update.component.html',
})
export class PaymentPlatformUpdateComponent implements OnInit {
  isSaving = false;
  paymentPlatform: IPaymentPlatform | null = null;
  paymentTypeValues = Object.keys(PaymentType);

  ordersSharedCollection: IOrder[] = [];

  editForm: PaymentPlatformFormGroup = this.paymentPlatformFormService.createPaymentPlatformFormGroup();

  constructor(
    protected paymentPlatformService: PaymentPlatformService,
    protected paymentPlatformFormService: PaymentPlatformFormService,
    protected orderService: OrderService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareOrder = (o1: IOrder | null, o2: IOrder | null): boolean => this.orderService.compareOrder(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentPlatform }) => {
      this.paymentPlatform = paymentPlatform;
      if (paymentPlatform) {
        this.updateForm(paymentPlatform);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentPlatform = this.paymentPlatformFormService.getPaymentPlatform(this.editForm);
    if (paymentPlatform.id !== null) {
      this.subscribeToSaveResponse(this.paymentPlatformService.update(paymentPlatform));
    } else {
      this.subscribeToSaveResponse(this.paymentPlatformService.create(paymentPlatform));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentPlatform>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(paymentPlatform: IPaymentPlatform): void {
    this.paymentPlatform = paymentPlatform;
    this.paymentPlatformFormService.resetForm(this.editForm, paymentPlatform);

    this.ordersSharedCollection = this.orderService.addOrderToCollectionIfMissing<IOrder>(
      this.ordersSharedCollection,
      paymentPlatform.order
    );
  }

  protected loadRelationshipsOptions(): void {
    this.orderService
      .query()
      .pipe(map((res: HttpResponse<IOrder[]>) => res.body ?? []))
      .pipe(map((orders: IOrder[]) => this.orderService.addOrderToCollectionIfMissing<IOrder>(orders, this.paymentPlatform?.order)))
      .subscribe((orders: IOrder[]) => (this.ordersSharedCollection = orders));
  }
}
