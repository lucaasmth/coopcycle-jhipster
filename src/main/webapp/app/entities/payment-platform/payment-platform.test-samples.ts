import { PaymentType } from 'app/entities/enumerations/payment-type.model';

import { IPaymentPlatform, NewPaymentPlatform } from './payment-platform.model';

export const sampleWithRequiredData: IPaymentPlatform = {
  id: 64779,
  amount: 90753,
  paymentType: PaymentType['IZLY'],
};

export const sampleWithPartialData: IPaymentPlatform = {
  id: 79086,
  amount: 83233,
  paymentType: PaymentType['CHEQUE_REPAS'],
};

export const sampleWithFullData: IPaymentPlatform = {
  id: 17113,
  amount: 21360,
  paymentType: PaymentType['CRYPTO'],
};

export const sampleWithNewData: NewPaymentPlatform = {
  amount: 46188,
  paymentType: PaymentType['CRYPTO'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
