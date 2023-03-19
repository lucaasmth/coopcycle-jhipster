import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOrder, NewOrder } from '../order.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOrder for edit and NewOrderFormGroupInput for create.
 */
type OrderFormGroupInput = IOrder | PartialWithRequiredKeyOf<NewOrder>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOrder | NewOrder> = Omit<T, 'orderDate' | 'deliveryDate'> & {
  orderDate?: string | null;
  deliveryDate?: string | null;
};

type OrderFormRawValue = FormValueOf<IOrder>;

type NewOrderFormRawValue = FormValueOf<NewOrder>;

type OrderFormDefaults = Pick<NewOrder, 'id' | 'orderDate' | 'deliveryDate'>;

type OrderFormGroupContent = {
  id: FormControl<OrderFormRawValue['id'] | NewOrder['id']>;
  number: FormControl<OrderFormRawValue['number']>;
  orderDate: FormControl<OrderFormRawValue['orderDate']>;
  deliveryDate: FormControl<OrderFormRawValue['deliveryDate']>;
  status: FormControl<OrderFormRawValue['status']>;
  client: FormControl<OrderFormRawValue['client']>;
  restaurant: FormControl<OrderFormRawValue['restaurant']>;
  courier: FormControl<OrderFormRawValue['courier']>;
};

export type OrderFormGroup = FormGroup<OrderFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OrderFormService {
  createOrderFormGroup(order: OrderFormGroupInput = { id: null }): OrderFormGroup {
    const orderRawValue = this.convertOrderToOrderRawValue({
      ...this.getFormDefaults(),
      ...order,
    });
    return new FormGroup<OrderFormGroupContent>({
      id: new FormControl(
        { value: orderRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      number: new FormControl(orderRawValue.number, {
        validators: [Validators.required],
      }),
      orderDate: new FormControl(orderRawValue.orderDate, {
        validators: [Validators.required],
      }),
      deliveryDate: new FormControl(orderRawValue.deliveryDate),
      status: new FormControl(orderRawValue.status),
      client: new FormControl(orderRawValue.client),
      restaurant: new FormControl(orderRawValue.restaurant),
      courier: new FormControl(orderRawValue.courier),
    });
  }

  getOrder(form: OrderFormGroup): IOrder | NewOrder {
    return this.convertOrderRawValueToOrder(form.getRawValue() as OrderFormRawValue | NewOrderFormRawValue);
  }

  resetForm(form: OrderFormGroup, order: OrderFormGroupInput): void {
    const orderRawValue = this.convertOrderToOrderRawValue({ ...this.getFormDefaults(), ...order });
    form.reset(
      {
        ...orderRawValue,
        id: { value: orderRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OrderFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      orderDate: currentTime,
      deliveryDate: currentTime,
    };
  }

  private convertOrderRawValueToOrder(rawOrder: OrderFormRawValue | NewOrderFormRawValue): IOrder | NewOrder {
    return {
      ...rawOrder,
      orderDate: dayjs(rawOrder.orderDate, DATE_TIME_FORMAT),
      deliveryDate: dayjs(rawOrder.deliveryDate, DATE_TIME_FORMAT),
    };
  }

  private convertOrderToOrderRawValue(
    order: IOrder | (Partial<NewOrder> & OrderFormDefaults)
  ): OrderFormRawValue | PartialWithRequiredKeyOf<NewOrderFormRawValue> {
    return {
      ...order,
      orderDate: order.orderDate ? order.orderDate.format(DATE_TIME_FORMAT) : undefined,
      deliveryDate: order.deliveryDate ? order.deliveryDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
