import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPaymentPlatform, NewPaymentPlatform } from '../payment-platform.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPaymentPlatform for edit and NewPaymentPlatformFormGroupInput for create.
 */
type PaymentPlatformFormGroupInput = IPaymentPlatform | PartialWithRequiredKeyOf<NewPaymentPlatform>;

type PaymentPlatformFormDefaults = Pick<NewPaymentPlatform, 'id'>;

type PaymentPlatformFormGroupContent = {
  id: FormControl<IPaymentPlatform['id'] | NewPaymentPlatform['id']>;
  amount: FormControl<IPaymentPlatform['amount']>;
  paymentType: FormControl<IPaymentPlatform['paymentType']>;
  order: FormControl<IPaymentPlatform['order']>;
};

export type PaymentPlatformFormGroup = FormGroup<PaymentPlatformFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PaymentPlatformFormService {
  createPaymentPlatformFormGroup(paymentPlatform: PaymentPlatformFormGroupInput = { id: null }): PaymentPlatformFormGroup {
    const paymentPlatformRawValue = {
      ...this.getFormDefaults(),
      ...paymentPlatform,
    };
    return new FormGroup<PaymentPlatformFormGroupContent>({
      id: new FormControl(
        { value: paymentPlatformRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      amount: new FormControl(paymentPlatformRawValue.amount, {
        validators: [Validators.required],
      }),
      paymentType: new FormControl(paymentPlatformRawValue.paymentType, {
        validators: [Validators.required],
      }),
      order: new FormControl(paymentPlatformRawValue.order),
    });
  }

  getPaymentPlatform(form: PaymentPlatformFormGroup): IPaymentPlatform | NewPaymentPlatform {
    return form.getRawValue() as IPaymentPlatform | NewPaymentPlatform;
  }

  resetForm(form: PaymentPlatformFormGroup, paymentPlatform: PaymentPlatformFormGroupInput): void {
    const paymentPlatformRawValue = { ...this.getFormDefaults(), ...paymentPlatform };
    form.reset(
      {
        ...paymentPlatformRawValue,
        id: { value: paymentPlatformRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PaymentPlatformFormDefaults {
    return {
      id: null,
    };
  }
}
