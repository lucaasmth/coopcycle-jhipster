import { IOrder } from 'app/entities/order/order.model';
import { PaymentType } from 'app/entities/enumerations/payment-type.model';

export interface IPaymentPlatform {
  id: number;
  amount?: number | null;
  paymentType?: PaymentType | null;
  order?: Pick<IOrder, 'id' | 'number'> | null;
}

export type NewPaymentPlatform = Omit<IPaymentPlatform, 'id'> & { id: null };
